import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import mermaid from 'mermaid';

const Mermaid = ({ code, theme }) => {
  if (!window) {
    return null;
  }

  useLayoutEffect(() => {
    const config = { theme, startOnLoad: true };
    mermaid.initialize(config);
    mermaid.contentLoaded();
  }, []);

  return (
    <Box my="5" className="mermaid">
      {code}
    </Box>
  );
};

Mermaid.propTypes = {
  code: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Mermaid;
