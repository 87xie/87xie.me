import { graphql, Link } from 'gatsby';
import {
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import SEO from '@components/seo';
import { SkipNavContent } from '@components/skip-nav';
import * as PostsSection from '@features/posts/posts-section';

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      nodes {
        id
        frontmatter {
          title
          tags
          slug
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;

const PostsPaginationTemplate = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes;
  const { currentPage, totalPages } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <>
      <SkipNavContent />
      <Box maxWidth="4xl" marginX="auto">
        <PostsSection.Section>
          <PostsSection.Heading>
            Posts
            <Text fontSize="sm" lineHeight="tall">
              {`(page ${currentPage} of ${totalPages})`}
            </Text>
          </PostsSection.Heading>
          <PostsSection.Previews posts={posts} />
        </PostsSection.Section>

        <Box marginTop="5">
          <Button
            as={Link}
            disabled={isFirst}
            pointerEvents={isFirst ? 'none' : 'auto'}
            size="sm"
            to={`/posts/${prevPage}`}
            leftIcon={<FiArrowLeft />}
            colorScheme="red"
            mr="7"
          >
            Prev
          </Button>

          <Button
            as={Link}
            disabled={isLast}
            pointerEvents={isLast ? 'none' : 'auto'}
            size="sm"
            to={`/posts/${nextPage}`}
            rightIcon={<FiArrowRight />}
            colorScheme="red"
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const Head = () => (
  <SEO title="posts" />
);

export default PostsPaginationTemplate;
