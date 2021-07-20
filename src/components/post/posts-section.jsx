/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import PostPreview from '@components/post/post-preview';

const SectionHeading = (props) => (
  <Heading
    as="h2"
    fontSize={['2xl', '3xl']}
    marginBottom="5"
    color={useColorModeValue('orange.400', 'orange.200')}
    {...props}
  />
);

const PostList = ({ posts }) => (
  <Grid gap="5">
    {posts.map(({ frontmatter }) => (
      <PostPreview key={frontmatter.slug}>
        <PostPreview.TagGroup>
          {frontmatter.tags.map((tag, index) => (
            <PostPreview.Tag
              key={index}
              to={`/tag/${tag}`}
            >
              {tag}
            </PostPreview.Tag>
          ))}
        </PostPreview.TagGroup>

        <Box
          role="link"
          as={GatsbyLink}
          to={`post/${frontmatter.slug}`}
          display="block"
        >
          <PostPreview.Heading fontSize="2xl">
            {frontmatter.title}
          </PostPreview.Heading>

          <PostPreview.DateText>
            {frontmatter.date}
          </PostPreview.DateText>
        </Box>
      </PostPreview>
    ))}
  </Grid>
);

const PostsSection = ({ children, ...props }) => (
  <Box as="section" {...props}>
    {children}
  </Box>
);

PostsSection.List = PostList;
PostsSection.Heading = SectionHeading;

export default PostsSection;
