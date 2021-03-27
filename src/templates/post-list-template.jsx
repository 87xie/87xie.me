/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import {
  Box,
  Stack,
  Badge,
  Grid,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
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
            date(formatString: "yyyy-MM-DD")
          }
        }
      }
    }
  }
`;

const PostItem = ({ post }) => {
  const {
    tags = [],
    date,
    slug,
  } = post.frontmatter;
  const [title] = post.headings;

  return (
    <Link to={`/post/${slug}`}>
      <Stack direction="row">
        {tags.map((tag) => (
          <Badge key={tag} colorScheme="red">
            {tag}
          </Badge>
        ))}
      </Stack>
      <Heading as="h2" size="lg">
        {title.value}
      </Heading>
      <Text as="small" fontSize="sm" color="gray">
        {date}
      </Text>
    </Link>
  );
};

const PostListTemplate = ({ data, pageContext }) => {
  const posts = data.allMdx.edges;
  const {
    currentPage,
    totalPages,
  } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Box
      maxWidth="3xl"
      marginX="auto"
    >
      <Grid gap="8" mb="8">
        {posts.map(({ node }) => (
          <PostItem key={node.id} post={node} />
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
