/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/react';
import CodeBlock from './elements/code-block';
import InlineCode from './elements/inline-code';
import Table from './elements/table';
import ExternalLink from './elements/external-link';
import Blockquote from './elements/blockquote';

const mdxCSS = css`
  h2, h3, h4, h5, h6, p, li {
    line-height: 1.75;
  }
  h2, h3, h4, h5, h6, strong {
    font-weight: var(--chakra-fontWeights-bold);
  }
  h3, h4, h5, h6, p {
    margin-bottom: var(--chakra-space-6);
  }
  h2 {
    margin: var(--chakra-space-7) 0;
    border-bottom: 1px solid;
    border-color: inherit;
    padding-bottom: var(--chakra-space-1);
    font-size: var(--chakra-fontSizes-2xl);
  }
  h3 {
    font-size: var(--chakra-fontSizes-xl);
  }
  h4 {
    font-size: var(--chakra-fontSizes-lg);
  }
  p {
    font-size: var(--chakra-fontSizes-md);
  }
  ul, ol {
    margin-bottom: var(--chakra-space-6);
    padding-left: var(--chakra-space-7);
    li {
      margin-top: var(--chakra-space-2);
      ul {
        margin: var(--chakra-space-1) 0;
      }
    }
  }
`;

const MDXContainer = ({ children }) => {
  const components = {
    table: Table,
    pre: CodeBlock,
    a: ExternalLink,
    inlineCode: InlineCode,
    blockquote: Blockquote,
  };

  return (
    <Box css={mdxCSS}>
      <MDXProvider components={components}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </Box>
  );
};

export default MDXContainer;
