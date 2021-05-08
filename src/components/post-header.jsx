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

const ConditionWrapper = ({ wrapper, condition, children }) => condition
  ? wrapper(children)
  : children;

const PostHeader = ({
  titleAs = 'h2',
  postTitle = '',
  postSlug = '',
  postTags = [],
  publishedAt = '',
}) => {
  const isTopLevelHeading = titleAs === 'h1';

  return (
    <Box
      marginBottom={isTopLevelHeading ? '7' : '0'}
      paddingBottom={isTopLevelHeading ? '2' : '0'}
      borderBottom={isTopLevelHeading ? '1px solid' : 'none'}
      borderColor="inherit"
    >
      <Flex wrap="wrap">
        {postTags.map((tag) => (
          <GatsbyLink
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

      <ConditionWrapper
        condition={!isTopLevelHeading}
        wrapper={(children) => (
          <Box
            as={GatsbyLink}
            to={`/post/${postSlug}`}
            display="block"
          >
            {children}
          </Box>
        )}
      >
        <Heading
          as={titleAs}
          color={useColorModeValue('gray.600', 'white.900')}
          fontSize={isTopLevelHeading ? '3xl' : ['xl', '2xl']}
        >
          {postTitle}
        </Heading>
        <Text as="small" fontSize="sm" color="gray">
          {publishedAt}
        </Text>
      </ConditionWrapper>
    </Box>
  );
};

PostHeader.propTypes = {
  titleAs: PropTypes.string,
  postSlug: PropTypes.string,
  postTitle: PropTypes.string.isRequired,
  postTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  publishedAt: PropTypes.string.isRequired,
};

export default PostHeader;
