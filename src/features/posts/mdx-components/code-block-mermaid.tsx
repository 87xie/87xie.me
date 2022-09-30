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

const Mermaid = ({ code }: { code: string; }) => {
  const theme = useColorModeValue('default', 'dark');
  const id = `mermaid-${getUuid()}`;
  const graphContainerElementRef = useRef<HTMLDivElement>(null);
  const graphElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      theme,
      startOnLoad: true,
    });

    const graphContainer = graphContainerElementRef.current;
    const graphEl = graphContainerElementRef.current;
    if (!graphContainer || !graphEl) return;

    mermaid.render(id, code, (graphSvg) => {
      graphContainer.innerHTML = graphSvg;
    }, graphEl);
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

export default Mermaid;
