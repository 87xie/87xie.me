import { Box } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/react';
import CodeBlock from './code-block';
import InlineCode from './inline-code';
import Table from './table';
import ExternalLink from './external-link';
import Blockquote from './blockquote';
import HeadingWithHashLink from './heading-with-hash-link';

const mdxCss = css`
  h3, h4, h5, h6, p, li {
    line-height: 1.75;
  }
  h3, h4, h5, h6, strong {
    font-weight: var(--chakra-fontWeights-bold);
  }
  h3, h4, h5, h6, p {
    margin-bottom: var(--chakra-space-6);
  }
  h3 {
    font-size: var(--chakra-fontSizes-xl);
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
  hr {
    margin: var(--chakra-space-8) 0;
  }
`;

const MdxRoot = ({ children }) => {
  const components = {
    table: Table,
    pre: CodeBlock,
    a: ExternalLink,
    inlineCode: InlineCode,
    blockquote: Blockquote,
    h2: HeadingWithHashLink,
  };

  return (
    <Box css={mdxCss}>
      <MDXProvider components={components}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </Box>
  );
};

export default MdxRoot;
