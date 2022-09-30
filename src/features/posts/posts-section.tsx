import {
  Box,
  Grid,
  Link as ChakraLink,
  Heading as ChakraHeading,
  BoxProps,
  HeadingProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import * as PostMetadata from '@features/posts/post-metadata';
import { PostFrontmatter } from './types';

export const Heading = (props: HeadingProps) => (
  <ChakraHeading
    as="h1"
    fontSize={['2xl', '3xl']}
    marginBottom="5"
    color={useColorModeValue('orange.500', 'orange.200')}
    {...props}
  />
);

interface PreviewProps {
  posts: Array<{ frontmatter: PostFrontmatter }>
}

export const Previews = ({ posts }: PreviewProps) => (
  <Grid gap={['4']}>
    {posts.map(({ frontmatter }) => (
      <Box
        as="article"
        key={frontmatter.slug}
        paddingBottom="4"
        borderBottom="1px"
        borderColor="inherit"
      >
        <PostMetadata.Date>
          {frontmatter.date}
        </PostMetadata.Date>

        <PostMetadata.Heading
          as="h2"
          fontSize="1.375rem"
          display="flex"
          mb="2"
        >
          <ChakraLink
            as={GatsbyLink}
            to={`/post/${frontmatter.slug}`}
            flex="auto"
          >
            {frontmatter.title}
          </ChakraLink>
        </PostMetadata.Heading>

        <PostMetadata.TagGroup>
          {frontmatter.tags.map((tag) => (
            <PostMetadata.Tag
              key={tag}
              to={`/tag/${tag}`}
            >
              {tag}
            </PostMetadata.Tag>
          ))}
        </PostMetadata.TagGroup>
      </Box>
    ))}
  </Grid>
);

export const Section = (props: BoxProps) => (
  <Box as="section" {...props} />
);
