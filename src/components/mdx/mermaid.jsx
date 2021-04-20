import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import mermaid from 'mermaid';

const Mermaid = ({ code }) => {
  const config = { startOnLoad: true, theme: 'neutral' };

  useEffect(() => {
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
};

export default Mermaid;
