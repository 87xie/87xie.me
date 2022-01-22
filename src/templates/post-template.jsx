/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import {
  Box,
  Icon,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
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

const HistoryBack = ({
  autoFocus = false,
  children = 'window.history.back()',
}) => {
  const linkRef = useRef();
  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    if (window?.location?.hash) {
      return;
    }

    linkRef.current.focus();
  }, []);

  return (
    <ChakraLink
      href="#"
      aria-label="Back to referrer"
      display="inline-flex"
      alignItems="center"
      marginBottom="2"
      color={useColorModeValue('orange.500', 'orange.200')}
      letterSpacing="wider"
      ref={linkRef}
      onClick={() => window.history.back()}
    >
      <Icon as={FiChevronLeft} w={4} h={4} marginRight="1" />
      <Box
        as="span"
        display="inline-block"
        fontSize="md"
        textDecoration="underline"
      >
        {children}
      </Box>
    </ChakraLink>
  );
};

const PostTemplate = ({ data }) => {
  const {
    date,
    title,
  } = data.mdx.frontmatter;

  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <Box maxW="4xl" marginX="auto">
        <HistoryBack autoFocus />
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
