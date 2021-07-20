import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PostPreviewHeading from './post-preview-heading';
import PostPreviewDateText from './post-preview-date-text';
import PostTag from './post-tag';

const PostPreview = ({ to, children, ...props }) => (
  <Box as="article" {...props}>
    {children}
  </Box>
);

const TagGroup = (props) => (
  <Flex wrap="wrap" marginX="-1.5" {...props} />
);

const Tag = (props) => <PostTag margin="1.5" {...props} />;

PostPreview.Tag = Tag;
PostPreview.TagGroup = TagGroup;
PostPreview.DateText = PostPreviewDateText;
PostPreview.Heading = PostPreviewHeading;

PostPreview.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default PostPreview;
