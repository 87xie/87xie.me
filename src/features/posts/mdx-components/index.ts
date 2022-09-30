import type { MDXComponents } from 'mdx/types';
import CodeBlock from './code-block';
import InlineCode from './inline-code';
import Table from './table';
import ExternalLink from './external-link';
import Blockquote from './blockquote';
import Wrapper from './wrapper';
import HeadingWithHashLink from './heading-with-hash-link';

export const components = {
  wrapper: Wrapper,
  table: Table,
  pre: CodeBlock,
  a: ExternalLink,
  code: InlineCode,
  blockquote: Blockquote,
  h2: HeadingWithHashLink,
} as MDXComponents;
