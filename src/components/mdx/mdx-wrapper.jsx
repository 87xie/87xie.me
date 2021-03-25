/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import CodeBlock from './code-block';
import Code from './code';
import Table from './table';
import ExternalLink from './external-link';
import Blockquote from './blockquote';
import css from './style';

const components = {
  table: Table,
  pre: CodeBlock,
  a: ExternalLink,
  inlineCode: Code,
  blockquote: Blockquote,
};

const MDXWrapper = ({ children }) => {
  return (
    <div css={css}>
      <MDXProvider components={components}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </div>
  );
};

export default MDXWrapper;
