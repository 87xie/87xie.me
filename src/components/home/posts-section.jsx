/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Grid,
  Heading,
} from '@chakra-ui/react';
import PostHeader from '@components/post-header';

const PostsSection = ({
  posts,
  title,
  titleColor,
  ...props
}) => (
  <Box as="section" {...props}>
    <Heading
      as="h2"
      fontSize="2xl"
      marginBottom="5"
      color={titleColor}
    >
      {title}
    </Heading>
    <Grid gap="5">
      {posts.map((post) => (
        <PostHeader
          key={post.id}
          postSlug={post.frontmatter.slug}
          postTags={post.frontmatter.tags}
          postTitle={post.frontmatter.title}
          publishedAt={post.frontmatter.date}
          titleAs="h3"
        />
      ))}
    </Grid>
  </Box>
);

export default PostsSection;
