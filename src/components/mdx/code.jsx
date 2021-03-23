import React from 'react';
import {
  Box,
  useColorMode,
} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const Code = ({ children }) => {
  const { colorMode } = useColorMode();
  const styles = {
    background: {
      dark: 'rgb(54, 60, 72)',
      light: 'rgba(220, 220, 220, 0.5)',
    },
    color: {
      dark: 'rgb(251, 211, 141)',
      light: 'rgb(61, 126, 154)',
    },
  };

  return (
    <Box
      as="code"
      padding="1"
      borderRadius="sm"
      background={styles.background[colorMode]}
      color={styles.color[colorMode]}
    >
      {children}
    </Box>
  );
};

export default Code;
