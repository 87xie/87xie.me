import { useState } from 'react';
import {
  graphql,
  navigate,
  useStaticQuery,
} from 'gatsby';
import { useDebouncedCallback } from 'use-debounce';
import * as JsSearch from 'js-search';

const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
          tags
          slug
        }
      }
    }
  }
`;

const usePostsSearch = () => {
  // get posts init js-search
  const data = useStaticQuery(query);
  const posts = data.allMdx.nodes.map(({ frontmatter }) => ({ ...frontmatter }));
  const jsSearch = new JsSearch.Search('title');
  jsSearch.addIndex('tags');
  jsSearch.addDocuments(posts);

  // downshift
  const [searchResult, setSearchResult] = useState([]);
  const onInputValueChangeWithDebounce = useDebouncedCallback(({ inputValue, isOpen }) => {
    if (!isOpen) {
      return;
    }

    const trimmedValue = inputValue.trim();

    if (trimmedValue.length > 2) {
      setSearchResult(jsSearch.search(trimmedValue));
      return;
    }

    if (trimmedValue.length < 2 && searchResult.length) {
      setSearchResult([]);
    }
  });

  const onSelectedItemChange = ({ selectedItem: post }) => {
    if (post) {
      navigate(`/post/${post.slug}`);
    }
  };

  return {
    posts,
    downshiftOptions: {
      onSelectedItemChange,
      items: searchResult,
      onInputValueChange: onInputValueChangeWithDebounce,
      itemToString: (item) => item?.title || '',
    },
  };
};

export default usePostsSearch;
