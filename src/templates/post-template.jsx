/* eslint-disable */
import React from 'react';
import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import MDXWrapper from '@components/mdx/mdx-wrapper';

export const query = graphql`
  query ($id: String!) {
    mdx(id: {eq: $id}) {
      id
      body
    }
  }
`;

const PostTemplate = ({ data }) => {
  return (
    <Box maxW="860px" margin="2.5rem auto 2.5rem">
      <MDXWrapper>{data.mdx.body}</MDXWrapper>
    </Box>
  );
};

export default PostTemplate;
