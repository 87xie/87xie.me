/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import PostsSection from '@components/post/posts-section';
import { SkipNavContent } from '@components/skip-nav';

const IndividualTagTemplate = ({ pageContext }) => {
  const { tag = '' } = pageContext;
  const posts = pageContext?.posts || [];

  return (
    <>
      <SEO title={tag} />
      <Box maxWidth="4xl" marginX="auto">
        <SkipNavContent />
        <PostsSection>
          <PostsSection.Heading textTransform="uppercase">
            {tag}
          </PostsSection.Heading>
          <PostsSection.List posts={posts} />
        </PostsSection>
      </Box>
    </>
  );
};

export default IndividualTagTemplate;
