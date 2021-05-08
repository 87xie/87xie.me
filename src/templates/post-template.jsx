/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Icon,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import {
  graphql,
  navigate,
} from 'gatsby';
import { css } from '@emotion/react';
import SEO from '@components/seo/seo';
import PostHeader from '@components/post-header';
import MDXContainer from '@components/mdx/mdx-container';

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
    tags,
  } = data.mdx.frontmatter;
  const theme = useTheme();
  const postTemplateCss = css`
    h2, h3, h4, h5, h6 {
      color: ${useColorModeValue(theme.colors.gray[600], theme.colors.gray[100])};
      font-weight: ${theme.fontWeights.bold};
      line-height: ${theme.lineHeights.tall};
    }
    h2 {
      border-bottom: 1px solid;
      border-color: inherit;
    }
    h2 {
      margin: ${theme.space[7]} 0;
      font-size: ${theme.fontSizes['2xl']};
    }
    h3 {
      margin: ${theme.space[5]} 0;
      font-size: ${theme.fontSizes.xl};
    }
    h4 {
      margin: ${theme.space[4]} 0;
      font-size: ${theme.fontSizes.lg};
    }
    p {
      margin: ${theme.space[4]} 0;
      font-size: ${theme.fontSizes.md};
      line-height: 1.88;
    }
    ul, ol {
      margin: ${theme.space[5]} 0;
      padding-left: ${theme.space[6]};
      li {
        margin-top: ${theme.space[2]};
        ul {
          margin: ${theme.space[2]} 0;
        }
      }
    }
  `;

  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <Box css={postTemplateCss} maxW="4xl" marginX="auto">
        <Box
          aria-label="To the previous page."
          display="inline-flex"
          alignItems="center"
          marginBottom="4"
          cursor="pointer"
          color={useColorModeValue('green.600', 'green.200')}
          onClick={() => navigate(-1)}
          letterSpacing="wider"
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
        <PostHeader
          isTopLevelHeading
          postTags={tags}
          postTitle={title}
          publishedAt={date}
        />
        <MDXContainer>
          {data.mdx.body}
        </MDXContainer>
      </Box>
    </>
  );
};

export default PostTemplate;
