import React from 'react';
import PropTypes from 'prop-types';
import {
  Link as GatsbyLink,
} from 'gatsby';
import {
  Box,
  Flex,
  Text,
  Badge,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const PostHeader = ({
  isTopLevelHeading = false,
  postTitle = '',
  postSlug = '',
  postTags = [],
  publishedAt = '',
}) => (
  <Box
    marginBottom={isTopLevelHeading ? '7' : '0'}
    paddingBottom={isTopLevelHeading ? '2' : '0'}
    borderBottom={isTopLevelHeading ? '1px solid' : 'none'}
    borderColor="inherit"
  >
    <Flex wrap="wrap">
      {postTags.map((tag) => (
        <GatsbyLink
          as={GatsbyLink}
          key={tag}
          to={`/tag/${tag}`}
        >
          <Badge
            colorScheme="red"
            display="inline-block"
            marginRight="2"
            marginBottom="2"
          >
            {tag}
          </Badge>
        </GatsbyLink>
      ))}
    </Flex>
    <Heading
      as={isTopLevelHeading ? 'h1' : 'h2'}
      color={useColorModeValue('gray.600', 'white.900')}
      fontSize={isTopLevelHeading ? '3xl' : ['xl', '2xl']}
    >
      {postSlug
        ? (
          <GatsbyLink to={`/post/${postSlug}`}>
            {postTitle}
          </GatsbyLink>
        )
        : postTitle}
    </Heading>
    <Text as="small" fontSize="sm" color="gray">
      {publishedAt}
    </Text>
  </Box>
);

PostHeader.propTypes = {
  isTopLevelHeading: PropTypes.bool,
  postSlug: PropTypes.string,
  postTitle: PropTypes.string.isRequired,
  postTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  publishedAt: PropTypes.string.isRequired,
};

export default PostHeader;
