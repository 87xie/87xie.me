/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import SEO from '@components/seo/seo';
import PostHeader from '@components/post-header';

const TagTemplate = ({ pageContext }) => {
  const { tag } = pageContext;
  const posts = pageContext?.posts || [];

  return (
    <>
      <SEO title={tag} />
      <Box
        maxWidth="4xl"
        marginX="auto"
      >
        <Box
          as="h1"
          marginBottom="5"
          color={useColorModeValue('orange.400', 'orange.200')}
          fontSize={['2xl', '3xl']}
          fontWeight="bold"
          textTransform="uppercase"
        >
          {tag}
        </Box>
        <Grid gap="5" mb="8">
          {posts.map(({ frontmatter, id }) => (
            <PostHeader
              key={id}
              postSlug={frontmatter.slug}
              postTitle={frontmatter.title}
              postTags={frontmatter.tags}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default TagTemplate;
