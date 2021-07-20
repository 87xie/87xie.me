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
            <Text color="gray" fontSize="md">
              {`page ${currentPage} of ${totalPages}`}
            </Text>
          </PostsSection.Heading>
          <PostsSection.List posts={posts} />
        </PostsSection>

        <Box marginTop="5">
          {!isFirst && (
            <Button
              as={Link}
              size="sm"
              to={`/posts/${prevPage}`}
              leftIcon={<FiArrowLeft />}
              colorScheme="orange"
              mr="5"
            >
              Prev
            </Button>
          )}

          {!isLast && (
            <Button
              as={Link}
              size="sm"
              to={`/posts/${nextPage}`}
              rightIcon={<FiArrowRight />}
              colorScheme="orange"
            >
              Next
            </Button>
          )}
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
