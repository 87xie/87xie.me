import { graphql } from 'gatsby';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import HistoryBack from '@components/history-back';
import { SkipNavContent } from '@components/skip-nav';
import MdxRoot from '@features/posts/mdx/mdx-root';
import * as PostMetadata from '@features/posts/post-metadata';

export const query = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        tags
        title
      }
    }
  }
`;

const PostTemplate = ({ data }) => {
  const {
    date,
    title,
  } = data.mdx.frontmatter;

  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <SkipNavContent />
      <Box maxW="4xl" marginX="auto">
        <HistoryBack />
        <Box as="article">
          <Box
            marginBottom="7"
            borderBottom="1px solid"
            borderColor="inherit"
            paddingBottom="2"
          >
            <PostMetadata.Heading as="h1" fontSize="3xl">
              {title}
            </PostMetadata.Heading>
            <PostMetadata.Date mb="1.5">
              {date}
            </PostMetadata.Date>
          </Box>
          <MdxRoot>
            {data.mdx.body}
          </MdxRoot>
        </Box>
      </Box>
    </>
  );
};

export default PostTemplate;
