import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';

const PostPreviewDate = (props) => (
  <Text
    as="small"
    fontSize="sm"
    color={useColorModeValue('gary.600', 'gray.300')}
    {...props}
  />
);

export default PostPreviewDate;
