/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const Code = ({ children }) => {
  const color = useColorModeValue('rgb(61, 126, 154)', 'rgb(251, 211, 141)');
  const backgroundColor = useColorModeValue('rgba(220, 220, 220, 0.5)', 'rgb(54, 60, 72)');

  return (
    <Box
      as="code"
      padding="1"
      borderRadius="sm"
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </Box>
  );
};

export default Code;
