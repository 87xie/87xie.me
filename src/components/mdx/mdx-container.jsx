/* eslint-disable react/prop-types */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import CodeBlock from './elements/code-block';
import Code from './elements/code';
import Table from './elements/table';
import ExternalLink from './elements/external-link';
import Blockquote from './elements/blockquote';

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
