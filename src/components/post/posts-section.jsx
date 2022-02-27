import {
  Box,
  Grid,
  Heading,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import PostPreview from '@components/post/post-preview';

const SectionHeading = (props) => (
  <Heading
    as="h2"
    fontSize={['2xl', '3xl']}
    marginBottom="5"
    color={useColorModeValue('orange.500', 'orange.200')}
    {...props}
  />
);

const PostList = ({ posts }) => (
  <Grid gap="6">
    {posts.map(({ frontmatter }) => (
      <PostPreview key={frontmatter.slug}>

        <ChakraLink
          display="block"
          as={GatsbyLink}
          to={`/post/${frontmatter.slug}`}
          sx={{
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <PostPreview.Heading fontSize="2xl">
            {frontmatter.title}
          </PostPreview.Heading>
        </ChakraLink>

        <PostPreview.DateText>
          {frontmatter.date}
        </PostPreview.DateText>

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
