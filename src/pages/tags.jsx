import React from 'react';
import PropTypes from 'prop-types';
import {
  graphql,
  Link as GatsbyLink,
} from 'gatsby';
import {
  Box,
  Flex,
  Badge,
  Link as ChakraLink,
} from '@chakra-ui/react';
import SEO from '@components/seo/seo';

const TagsPage = ({ data }) => {
  const tags = data?.allMdx?.group || [];

  return (
    <>
      <SEO title="tags" />
      <Box
        maxWidth="4xl"
        height="100%"
        margin="0 auto"
      >
        <Flex height="100%" alignItems="center">
          <Flex wrap="wrap" marginBottom="-4">
            {tags.map(({ fieldValue: tag }) => (
              <ChakraLink
                key={tag}
                as={GatsbyLink}
                to={`/tag/${tag}`}
                display="inline-block"
                marginBottom="4"
                marginRight="4"
              >
                <Badge
                  px="2"
                  fontSize="md"
                  colorScheme="red"
                >
                  {tag}
                </Badge>
              </ChakraLink>
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
