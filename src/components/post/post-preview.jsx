import {
  Box,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import PostTag from './post-tag';

const PostPreview = ({ to, children, ...props }) => (
  <Box as="article" {...props}>
    {children}
  </Box>
);

const TagGroup = (props) => <Flex wrap="wrap" mx="-1.5" mb="-1.5" {...props} />;
const Tag = (props) => <PostTag margin="1.5" {...props} />;

const PostPreviewHeading = (props) => <Heading as="h2" {...props} />;
const PostPreviewDateText = (props) => (
  <Text
    as="small"
    fontSize="xs"
    fontWeight="bold"
    color={useColorModeValue('gray.600', 'gray.400')}
    {...props}
  />
);

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
