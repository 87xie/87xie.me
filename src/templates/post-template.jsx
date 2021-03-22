/* eslint-disable */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

export const query = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      id
      body
    }
  }
`;

const PostTemplate = ({ pageContext, data }) => {
  const { id } = pageContext;
  return (
    <div>
      <div>{id}</div>
      <MDXProvider>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  );
};

export default PostTemplate;
