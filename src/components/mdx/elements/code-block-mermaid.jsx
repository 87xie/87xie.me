import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import mermaid from 'mermaid';

const Mermaid = ({ code }) => {
  if (!typeof window === undefined) {
    return null;
  }

  const theme = useColorModeValue('default', 'dark');

  useLayoutEffect(() => {
    const config = { theme, startOnLoad: true };
    mermaid.initialize(config);
    mermaid.contentLoaded();
  }, [theme]);

  return (
    <Box key={theme} my="5" className="mermaid">
      {code}
    </Box>
  );
};

Mermaid.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Mermaid;
