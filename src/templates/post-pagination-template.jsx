/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import {
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import SEO from '@components/seo';
import PostsSection from '@components/post/posts-section';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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
      <SEO title="posts" />
      <Box maxWidth="4xl" marginX="auto">
        <PostsSection>
          <PostsSection.Heading>
            Posts
            <Text fontSize="sm" lineHeight="tall">
              {`(page ${currentPage} of ${totalPages})`}
            </Text>
          </PostsSection.Heading>
          <PostsSection.List posts={posts} />
        </PostsSection>

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

PostsPaginationTemplate.propTypes = {
  pageContext: PropTypes.shape({
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
  }),
};

export default PostsPaginationTemplate;
