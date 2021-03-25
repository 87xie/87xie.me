/* eslint-disable react/prop-types */
import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

const Blockquote = ({ children }) => {
  const { colorMode } = useColorMode();
  const styles = {
    backgroundColor: {
      dark: 'rgba(251, 211, 141, 0.16)',
      light: 'rgb(254, 235, 200)',
    },
    borderColor: {
      dark: 'rgb(251, 211, 141)',
      light: 'rgb(221, 107, 32)',
    },
  };

  return (
    <Box
      as="blockquote"
      my="4"
      paddingY="3"
      paddingX="4"
      borderLeft="4px"
      borderColor={styles.borderColor[colorMode]}
      backgroundColor={styles.backgroundColor[colorMode]}
      sx={{ '& p': { margin: 0 } }}
    >
      {children}
    </Box>
  );
};

export default Blockquote;
