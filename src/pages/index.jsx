/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  graphql,
  Link as GatsbyLink,
} from 'gatsby';
import SEO from '@components/seo';
import BuiltWith from '@components/home/built-with';
import PostsSection from '@components/home/posts-section';

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allMdx(
      limit: 6
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

const Index = ({ data }) => {
  const [latestPost, ...recentPosts] = data.allMdx.nodes;
  const description = data.site.siteMetadata?.description;
  const textOrange = useColorModeValue('orange.400', 'orange.200');

  return (
    <>
      <SEO />
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        maxWidth="4xl"
        margin="0 auto"
        height="100%"
      >
        <Box
          flex={['auto', 'auto', '0 0 25%']}
          marginBottom={['6', '6', '0']}
          marginRight={['0', '0', '12']}
        >
          <Text
            marginBottom="6"
            lineHeight="1.2"
          >
            {description}
          </Text>
          <BuiltWith />
        </Box>

        <Box flex="auto">
          <PostsSection
            posts={[latestPost]}
            titleColor={textOrange}
            title="Latest Post"
            borderBottom="1px solid"
            borderColor="inherit"
            paddingBottom="5"
            marginBottom="6"
          />

          <PostsSection
            posts={recentPosts}
            titleColor={textOrange}
            title="Recent Posts"
            marginBottom="8"
          />

          <Box textAlign="right">
            <ChakraLink
              as={GatsbyLink}
              to="/posts"
              color={textOrange}
            >
              to=&quot;/posts&quot;
            </ChakraLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;
