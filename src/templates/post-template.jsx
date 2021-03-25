/* eslint-disable */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import MDXWrapper from '@components/mdx/mdx-wrapper';

export const query = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      id
      body
    }
  }
`;

const PostTemplate = ({ pageContext, data }) => {
  const { id } = pageContext;
  return (
    <Box
      maxW="860px"
      margin="60px auto"
    >
      <MDXWrapper>{data.mdx.body}</MDXWrapper>
    </Box>
  );
};

export default PostTemplate;
