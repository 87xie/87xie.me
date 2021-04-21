/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const Blockquote = ({ children }) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('pink.500', 'red.200');

  return (
    <Box
      as="blockquote"
      my="5"
      paddingY="4"
      paddingX="5"
      borderLeft="4px solid"
      borderColor={borderColor}
      borderRadius="sm"
      backgroundColor={backgroundColor}
      sx={{ '& p': { margin: 0 } }}
    >
      {children}
    </Box>
  );
};

export default Blockquote;
