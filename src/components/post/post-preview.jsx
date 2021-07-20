import React from 'react';
import { Box } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import PostPreviewHeading from './post-preview-heading';
import PostPreviewDateText from './post-preview-date-text';
import PostTag from './post-tag';

const PostPreview = ({ to, children, ...props }) => (
  <Box as="article" {...props}>
    {to ? <GatsbyLink to={to}>{children}</GatsbyLink> : children}
  </Box>
);

PostPreview.Tag = PostTag;
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
