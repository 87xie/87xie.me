/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import {
  Box,
  Grid,
  Flex,
  Button,
} from '@chakra-ui/react';
import SEO from '@components/seo/seo';
import PostHeader from '@components/post-header';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(limit: $limit, skip: $skip) {
      edges {
        node {
          id
          headings(depth: h1) {
            value
          }
          frontmatter {
            title
            tags
            slug
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`;

const PostListTemplate = ({ data, pageContext }) => {
  const posts = data.allMdx.edges;
  const { currentPage, totalPages } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <>
      <SEO title="posts" />
      <Box
        maxWidth="3xl"
        marginX="auto"
      >
        <Grid gap="8" mb="8">
          {posts.map(({ node }) => (
            <PostHeader
              key={node.id}
              postSlug={node.frontmatter.slug}
              postTitle={node.frontmatter.title}
              postTags={node.frontmatter.tags}
            />
          ))}
        </Grid>

        <Flex>
          {!isFirst && (
            <Button
              as={Link}
              size="sm"
              to={`/posts/${prevPage}`}
              leftIcon={<FiArrowLeft />}
              mr="auto"
              colorScheme="pink"
            >
              Previous
            </Button>
          )}

          {!isLast && (
            <Button
              as={Link}
              size="sm"
              to={`/posts/${nextPage}`}
              rightIcon={<FiArrowRight />}
              ml="auto"
              colorScheme="pink"
            >
              Next
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
};

PostListTemplate.propTypes = {
  pageContext: PropTypes.shape({
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
  }),
};

export default PostListTemplate;
