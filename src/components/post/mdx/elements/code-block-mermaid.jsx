import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import mermaid from 'mermaid';

// https://raymondjulin.com/blog/drawing-diagrams-in-sanity-with-mermaid-js

function getUuid(size = 4) {
  let uuid = '';
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < size; i += 1) {
    uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  return uuid;
}

const Mermaid = ({ code }) => {
  const isSSR = typeof window === 'undefined';
  const theme = useColorModeValue('default', 'dark');
  const id = `mermaid-${getUuid()}`;
  const ref = useRef();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    mermaid.initialize({ theme, startOnLoad: false });
    mermaid.render(id, code, (graphSvg) => {
      ref.current.innerHTML = graphSvg;
      setOpacity(1);
    });
  }, [theme]);

  return isSSR ? null : (
    <Box
      key="mermaid-container"
      ref={ref}
      opacity={opacity}
      my="7"
      minHeight="200px"
      transition="opacity .3s"
    />
  );
};

Mermaid.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Mermaid;
