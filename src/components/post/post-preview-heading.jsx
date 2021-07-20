import React from 'react';
import {
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const PostPreviewHeading = (props) => {
  const color = useColorModeValue('gray.600', 'white.900');

  return (
    <Heading
      as="h2"
      {...props}
      color={color}
    />
  );
};

export default PostPreviewHeading;
