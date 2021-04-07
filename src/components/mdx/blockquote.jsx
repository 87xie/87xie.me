/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const Blockquote = ({ children }) => {
  const backgroundColor = useColorModeValue('rgb(254, 235, 200)', 'rgba(251, 211, 141, 0.16)');
  const borderColor = useColorModeValue('rgb(221, 107, 32)', 'rgb(251, 211, 141)');

  return (
    <Box
      as="blockquote"
      mb="4"
      paddingY="3"
      paddingX="4"
      borderLeft="4px"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      sx={{ '& p': { margin: 0 } }}
    >
      {children}
    </Box>
  );
};

export default Blockquote;
