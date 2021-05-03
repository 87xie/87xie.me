/* eslint-disable react/prop-types */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import CodeBlock from './code-block';
import Code from './code';
import Table from './table';
import ExternalLink from './external-link';
import Blockquote from './blockquote';

const MDXContainer = ({ children }) => {
  const components = {
    table: Table,
    pre: CodeBlock,
    a: ExternalLink,
    inlineCode: Code,
    blockquote: Blockquote,
  };

  return (
    <MDXProvider components={components}>
      <MDXRenderer>
        {children}
      </MDXRenderer>
    </MDXProvider>
  );
};

export default MDXContainer;
