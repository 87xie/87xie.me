import PropTypes from 'prop-types';
import {
  useRef,
  useEffect,
} from 'react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import mermaid from 'mermaid';

function getUuid(size = 4) {
  let uuid = '';
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < size; i += 1) {
    uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  return uuid;
}

const Mermaid = ({ code }) => {
  const theme = useColorModeValue('default', 'dark');
  const id = `mermaid-${getUuid()}`;
  const graphContainerElementRef = useRef();
  const graphElementRef = useRef();

  useEffect(() => {
    mermaid.initialize({
      theme,
      startOnLoad: true,
    });

    mermaid.render(id, code, (graphSvg) => {
      graphContainerElementRef.current.innerHTML = graphSvg;
    }, graphElementRef.current);
  }, [theme, code]);

  return (
    <>
      <div ref={graphElementRef} />
      <Box
        marginY="7"
        ref={graphContainerElementRef}
      />
    </>
  );
};

Mermaid.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Mermaid;
