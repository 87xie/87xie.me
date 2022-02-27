import {
  Tag,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  Link as GatsbyLink,
} from 'gatsby';
import PropTypes from 'prop-types';

const PostTag = ({
  to,
  size = 'md',
  children,
  ...props
}) => (
  <ChakraLink as={GatsbyLink} to={to} {...props}>
    <Tag size={size} colorScheme="red">
      {children}
    </Tag>
  </ChakraLink>
);

PostTag.propTypes = {
  to: PropTypes.string.isRequired,
  size: PropTypes.string,
  children: PropTypes.node,
};

export default PostTag;
