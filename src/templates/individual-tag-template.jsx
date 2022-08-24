import { Box } from '@chakra-ui/react';
import SEO from '@components/seo';
import { SkipNavContent } from '@components/skip-nav';
import * as PostsSection from '@features/posts/posts-section';

const IndividualTagTemplate = ({ pageContext }) => {
  const { tag = '' } = pageContext;
  const posts = pageContext?.posts || [];

  return (
    <Box maxWidth="4xl" marginX="auto">
      <SkipNavContent />
      <PostsSection.Section>
        <PostsSection.Heading textTransform="uppercase">
          {tag}
        </PostsSection.Heading>
        <PostsSection.Previews posts={posts} />
      </PostsSection.Section>
    </Box>
  );
};

export const Head = ({ pageContext }) => (
  <SEO title={pageContext.tag} />
);

export default IndividualTagTemplate;
