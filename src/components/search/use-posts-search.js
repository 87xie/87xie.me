import { useState } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import * as JsSearch from 'js-search';

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

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
  const data = useStaticQuery(query);
  const [searchResult, setSearchResult] = useState([]);
  const posts = data.allMdx.nodes.map(({ frontmatter }) => ({ ...frontmatter }));

  const jsSearch = new JsSearch.Search('title');
  jsSearch.addIndex('tags');
  jsSearch.addDocuments(posts);

  const itemToString = (selectedPost) => selectedPost?.title || '';
  const onInputValueChange = debounce(({ inputValue }) => {
    const value = inputValue.trim();

    if (value.length < 2) {
      setSearchResult([]);
    } else {
      setSearchResult(jsSearch.search(value));
    }
  });

  const onSelectedItemChange = ({ selectedItem: post }) => {
    if (post) {
      navigate(`/post/${post.slug}`);
    }
  };

  return {
    downshiftOptions: {
      items: searchResult,
      itemToString,
      onInputValueChange,
      onSelectedItemChange,
    },
  };
};

export default usePostsSearch;
