import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';
import SEO from '@components/seo';
import PostTag from '@components/post/post-tag';
import { SkipNavContent } from '@components/skip-nav';

const TagsPage = ({ data }) => {
  const tags = data?.allMdx?.group || [];

  return (
    <>
      <SEO title="tags" />
      <SkipNavContent />
      <Box
        maxWidth="4xl"
        height="100%"
        margin="0 auto"
      >
        <Flex height="100%" alignItems="center">
          <Flex wrap="wrap" marginBottom="-4">
            {tags.map(({ fieldValue: tag }) => (
              <PostTag
                key={tag}
                to={`/tag/${tag}`}
                size="lg"
                display="inline-block"
                marginBottom="4"
                marginRight="4"
              >
                {tag}
              </PostTag>
            ))}
          </Flex>
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
