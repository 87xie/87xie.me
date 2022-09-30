import type { ReactNode } from 'react';
import type { PostFrontmatter } from '@features/posts/types';

import { graphql } from 'gatsby';
import {
  Box,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { FiChevronLeft } from 'react-icons/fi';
import { SkipNavContent } from '@components/skip-nav';
import SEO from '@components/seo';
import { components } from '@features/posts/mdx-components';
import * as PostMetadata from '@features/posts/post-metadata';

interface QueryData {
  mdx: {
    id: string;
    frontmatter: PostFrontmatter;
  }
}

interface PostTemplateProps {
  data: QueryData;
  children: ReactNode;
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      id
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        tags
        title
      }
    }
  }
`;

const PostTemplate = ({ data, children }: PostTemplateProps) => {
  const { mdx } = data;

  return (
    <>
      <SkipNavContent />
      <Box maxW="4xl" marginX="auto">
        <Button
          variant="link"
          aria-label="Back to referrer"
          display="inline-flex"
          alignItems="center"
          marginBottom="2"
          color={useColorModeValue('orange.500', 'orange.200')}
          letterSpacing="wider"
          onClick={() => window.history.back()}
        >
          <Icon as={FiChevronLeft} w={4} h={4} marginRight="1" />
          <Box
            as="span"
            display="inline-block"
            fontSize="md"
            textDecoration="underline"
          >
            window.history.back()
          </Box>
        </Button>

        <Box as="article">
          <Box
            marginBottom="7"
            borderBottom="1px solid"
            borderColor="inherit"
            paddingBottom="2"
          >
            <PostMetadata.Heading>
              {mdx.frontmatter.title}
            </PostMetadata.Heading>
            <PostMetadata.Date mb="1.5">
              {mdx.frontmatter.date}
            </PostMetadata.Date>
          </Box>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
        </Box>
      </Box>
    </>
  );
};

export const Head = ({ data }: { data: QueryData }) => (
  <SEO title={data.mdx.frontmatter.title} />
);

export default PostTemplate;
