import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Flex, VisuallyHidden } from '@chakra-ui/react';
import SEO from '@components/seo';
import * as PostMetadata from '@features/posts/post-metadata';
import { SkipNavContent } from '@components/skip-nav';

const TagsPage = ({ data }) => {
  const tags = data?.allMdx?.group || [];

  return (
    <>
      <SEO title="tags" />
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

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(PropTypes.shape({
        fieldValue: PropTypes.string.isRequired,
        totalCount: PropTypes.number.isRequired,
      })),
    }),
  }),
};

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

export default TagsPage;
