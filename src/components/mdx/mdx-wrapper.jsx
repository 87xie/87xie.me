/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import CodeBlock from './code-block';

const components = {
  pre: CodeBlock,
};

const MDXWrapper = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>
      {children}
    </MDXRenderer>
  </MDXProvider>
);

export default MDXWrapper;

MDXWrapper.propTypes = {
  children: PropTypes.string.isRequired,
};
