import { renderHook, act } from '@testing-library/react-hooks';
import {
  navigate,
  useStaticQuery,
} from 'gatsby';
import usePostsSearch from './use-posts-search';

// mock query
const mockPosts = [
  {
    frontmatter: {
      title: 'first-post',
      slug: 'first-post',
      tags: ['sass', 'css'],
    },
  },
  {
    frontmatter: {
      title: 'second-post',
      slug: 'second-post',
      tags: ['html', 'css', 'testing'],
    },
  },
];
useStaticQuery.mockReturnValue({
  allMdx: {
    nodes: mockPosts,
  },
});

// mock js-search
const mockAddIndex = jest.fn();
const mockAddDocuments = jest.fn();
const mockSearchResult = mockPosts.map((post) => ({ ...post.frontmatter }));
const mockSearch = jest.fn(() => mockSearchResult);

jest.mock('js-search', () => ({
  Search: jest.fn().mockImplementation(() => ({
    addIndex: mockAddIndex,
    addDocuments: mockAddDocuments,
    search: mockSearch,
  })),
}));

afterAll(() => {
  jest.clearAllMocks();
});

describe('use posts search hook', () => {
  it('exposes the downshift props and onInputValueChange work correctly', async () => {
    const { result } = renderHook(() => usePostsSearch());
    expect(result.current.downshiftProps.items.length).toBe(0);

    // should get search result
    const inputValue = 'testing';
    act(() => {
      result.current.downshiftProps.onInputValueChange({
        inputValue,
        isOpen: true,
      });
    });
    expect(mockSearch).toHaveBeenCalledWith(inputValue);
    expect(result.current.downshiftProps.items).toEqual(mockSearchResult);
    mockSearch.mockClear();

    // should clean search result
    act(() => {
      result.current.downshiftProps.onInputValueChange({ inputValue: '', isOpen: true });
    });
    expect(result.current.downshiftProps.items.length).toBe(0);
    expect(mockSearch).not.toHaveBeenCalled();

    // should ignore when isOpen is false
    act(() => {
      result.current.downshiftProps.onInputValueChange({
        inputValue,
        isOpen: false,
      });
    });
    expect(mockSearch).not.toHaveBeenCalled();

    // should programmatically navigate when an item selected
    const [post] = result.current.posts;
    act(() => {
      result.current.downshiftProps.onSelectedItemChange({ selectedItem: post });
    });
    expect(navigate).toHaveBeenCalledWith(`/post/${post.slug}`);
    navigate.mockClear();

    // should ignore navigate
    act(() => {
      result.current.downshiftProps.onSelectedItemChange({ selectedItem: null });
    });
    expect(navigate).not.toHaveBeenCalled();

    // should display post title
    expect(result.current.downshiftProps.itemToString(post)).toBe(post.title);
    expect(result.current.downshiftProps.itemToString(null)).toBe('');
  });
});
