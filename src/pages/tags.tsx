import { graphql } from 'gatsby';
import { Box, Flex, VisuallyHidden } from '@chakra-ui/react';
import SEO from '@components/seo';
import * as PostMetadata from '@features/posts/post-metadata';
import { SkipNavContent } from '@components/skip-nav';

export const query = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

interface QueryData {
  allMdx: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>
  }
}

const TagsPage = ({
  data,
}: { data: QueryData }) => {
  const tags = data?.allMdx?.group || [];

  return (
    <>
      <SkipNavContent />
      <VisuallyHidden as="h1">
        All the tags
      </VisuallyHidden>
      <Box
        maxWidth="4xl"
        height="100%"
        margin="0 auto"
      >
        <Flex height="100%" alignItems="center">
          <PostMetadata.TagGroup size="lg" gap="2">
            {tags.map(({ fieldValue: tag }) => (
              <PostMetadata.Tag
                to={`/tag/${tag}`}
                key={tag}
              >
                {tag}
              </PostMetadata.Tag>
            ))}
          </PostMetadata.TagGroup>
        </Flex>
      </Box>
    </>
  );
};

export const Head = () => (
  <SEO title="tags" />
);

export default TagsPage;
