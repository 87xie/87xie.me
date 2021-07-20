/* eslint-disable react/prop-types */
import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/react';
import CodeBlock from './elements/code-block';
import InlineCode from './elements/inline-code';
import Table from './elements/table';
import ExternalLink from './elements/external-link';
import Blockquote from './elements/blockquote';

const mdxCSS = css`
  h2, h3, h4, h5, h6 {
    font-weight: var(--chakra-fontWeights-bold);
    line-height: var(--chakra-lineHeights-tall);
  }

  h2 {
    border-bottom: 1px solid;
    border-color: inherit;
  }
  h2 {
    margin: var(--chakra-space-7) 0;
    font-size: var(--chakra-fontSizes-2xl);
  }
  h3 {
    margin: var(--chakra-space-5) 0;
    font-size: var(--chakra-fontSizes-xl);
  }
  h4 {
    margin: var(--chakra-space-4) 0;
    font-size: var(--chakra-fontSizes-lg);
  }
  p {
    margin: var(--chakra-space-4) 0;
    font-size: var(--chakra-fontSizes-md);
    line-height: 1.88;
  }
  ul, ol {
    margin: var(--chakra-space-5) 0;
    padding-left: var(--chakra-space-5);
    li {
      margin-top: var(--chakra-space-5);
      ul {
        margin: var(--chakra-space-5) 0;
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
  const { colorMode } = useColorMode();

  return (
    <Box css={mdxCSS} className={`is-${colorMode}-mode`}>
      <MDXProvider components={components}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </Box>
  );
};

export default MDXContainer;
