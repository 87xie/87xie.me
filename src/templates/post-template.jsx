import { graphql } from 'gatsby';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import HistoryBack from '@components/history-back';
import MDXContainer from '@components/post/mdx/mdx-container';
import PostPreview from '@components/post/post-preview';
import { SkipNavContent } from '@components/skip-nav';

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
          <PostPreview
            as="div"
            marginBottom="7"
            borderBottom="1px solid"
            borderColor="inherit"
            paddingBottom="2"
          >
            <PostPreview.Heading as="h1" fontSize="3xl">
              {title}
            </PostPreview.Heading>
            <PostPreview.DateText>
              {date}
            </PostPreview.DateText>
          </PostPreview>

          <MDXContainer>
            {data.mdx.body}
          </MDXContainer>
        </Box>
      </Box>
    </>
  );
};

export default PostTemplate;
