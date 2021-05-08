/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import {
  Box,
  Grid,
  Button,
} from '@chakra-ui/react';
import SEO from '@components/seo/seo';
import PostHeader from '@components/post-header';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      edges {
        node {
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
        maxWidth="4xl"
        marginX="auto"
      >
        <Grid gap="5" mb="5">
          {posts.map(({ node }) => (
            <PostHeader
              key={node.id}
              postSlug={node.frontmatter.slug}
              postTitle={node.frontmatter.title}
              postTags={node.frontmatter.tags}
              publishedAt={node.frontmatter.date}
            />
          ))}
        </Grid>

        <Box>
          {!isFirst && (
            <Button
              as={Link}
              size="sm"
              to={`/posts/${prevPage}`}
              leftIcon={<FiArrowLeft />}
              colorScheme="pink"
              mr="2"
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
              colorScheme="pink"
            >
              Next
            </Button>
          )}
        </Box>
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
