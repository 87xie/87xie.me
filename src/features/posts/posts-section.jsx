import {
  Box,
  Grid,
  Link as ChakraLink,
  Heading as ChakraHeading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import * as PostMetadata from '@features/posts/post-metadata';

export const Heading = (props) => (
  <ChakraHeading
    as="h1"
    fontSize={['2xl', '3xl']}
    marginBottom="5"
    color={useColorModeValue('orange.500', 'orange.200')}
    {...props}
  />
);

export const Previews = ({ posts }) => (
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
          {frontmatter.tags.map((tag, index) => (
            <PostMetadata.Tag
              key={index}
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

export const Section = ({ children, ...props }) => (
  <Box as="section" {...props}>
    {children}
  </Box>
);
