/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import { graphql, navigate } from 'gatsby';
import SEO from '@components/seo';
import MDXContainer from '@components/post/mdx/mdx-container';
import PostPreview from '@components/post/post-preview';

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
    title,
    date,
  } = data.mdx.frontmatter;

  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <Box maxW="4xl" marginX="auto">
        <Box
          aria-label="To the previous page."
          display="inline-flex"
          alignItems="center"
          marginBottom="2"
          cursor="pointer"
          color={useColorModeValue('orange.500', 'orange.200')}
          letterSpacing="wider"
          onClick={() => navigate(-1)}
        >
          <Icon as={FiChevronLeft} w={4} h={4} marginRight="1" />
          <Box
            as="span"
            display="inline-block"
            fontSize="md"
            textDecoration="underline"
          >
            window.history.back()
          </Box>
        </Box>

        <Box as="article">
          <PostPreview
            as="div"
            marginBottom="7"
            borderBottom="1px solid"
            borderColor="inherit"
            paddingBottom="2"
          >
            <PostPreview.Heading
              as="h1"
              fontSize="3xl"
            >
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
