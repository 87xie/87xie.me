import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Box,
  Text,
  Stack,
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
    <Stack direction="row" mb="2">
      {postTags.map((tag) => (
        <Link key={tag} to={`/tag/${tag}`}>
          <Badge colorScheme="red">
            {tag}
          </Badge>
        </Link>
      ))}
    </Stack>
    <Heading
      as={isTopLevelHeading ? 'h1' : 'h2'}
      size={isTopLevelHeading ? 'xl' : 'lg'}
      color={useColorModeValue('gray.600', 'white.900')}
    >
      {postSlug
        ? (
          <Link to={`/post/${postSlug}`}>
            {postTitle}
          </Link>
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
