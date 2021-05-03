/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
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
        <Grid gap="8" mb="8">
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
