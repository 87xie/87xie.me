/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { useColorModeValue, useTheme } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import CodeBlock from './code-block';
import Code from './code';
import Table from './table';
import ExternalLink from './external-link';
import Blockquote from './blockquote';

const components = {
  table: Table,
  pre: CodeBlock,
  a: ExternalLink,
  inlineCode: Code,
  blockquote: Blockquote,
};

const MDXWrapper = ({ children }) => {
  const theme = useTheme();
  const mdxCss = css`
    h1, h2, h3, h4, h5, h6 {
      color: ${useColorModeValue(theme.colors.gray[600], theme.colors.gray[100])};
      font-weight: ${theme.fontWeights.bold};
      line-height: ${theme.lineHeights.tall};
    }
    h1, h2 {
      border-bottom: 1px solid;
      border-color: inherit;
    }
    h1 {
      margin-bottom: ${theme.space[8]};
      font-size: ${theme.fontSizes['3xl']};
    }
    h2 {
      margin: ${theme.space[7]} 0;
      font-size: ${theme.fontSizes['2xl']};
    }
    h3 {
      margin: ${theme.space[5]} 0;
      font-size: ${theme.fontSizes.xl};
    }
    h4 {
      margin: ${theme.space[4]} 0;
      font-size: ${theme.fontSizes.lg};
    }
    p {
      margin: ${theme.space[4]} 0;
      font-size: ${theme.fontSizes.md};
      line-height: 1.88;
    }
    ul, ol {
      margin: ${theme.space[5]} 0;
      padding-left: ${theme.space[6]};
      li {
        margin-top: ${theme.space[2]};
        ul {
          margin: ${theme.space[2]} 0;
        }
      }
    }
  `;

  return (
    <div css={mdxCss}>
      <MDXProvider components={components}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </div>
  );
};

export default MDXWrapper;
