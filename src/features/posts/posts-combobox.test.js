import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import PostsCombobox from './posts-combobox';

// TODO: maybe mock gatsby static query instead of hook
jest.mock('./use-posts-search', () => jest.fn(() => {
  const downshiftProps = {
    items: [],
    onInputValueChange: jest.fn(),
    onSelectedItemChange: jest.fn(),
    itemToString: (item) => item?.title || '',
  };
  return { downshiftProps };
}));

afterAll(() => {
  jest.clearAllMocks();
});

describe('post-search-combobox', () => {
  it('allows input autofocus', () => {
    render(<PostsCombobox />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();

    const list = screen.getByRole('listbox');
    expect(list).toBeEmptyDOMElement();

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });
});
