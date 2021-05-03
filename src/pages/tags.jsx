import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { Badge, Stack } from '@chakra-ui/react';
import SEO from '@components/seo/seo';

const TagsPage = ({ data }) => {
  const tags = data?.allMdx?.group || [];

  return (
    <>
      <SEO title="tags" />
      <Stack
        spacing="4"
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {tags.map(({ fieldValue: tag }) => (
          <Link key={tag} to={`/tag/${tag}`}>
            <Badge
              px="2"
              fontSize="md"
              colorScheme="red"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </Stack>
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
