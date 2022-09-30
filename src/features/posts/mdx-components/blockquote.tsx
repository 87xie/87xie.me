import {
  Box,
  useColorModeValue,
  ChakraComponent,
  BoxProps,
} from '@chakra-ui/react';

type BlockquoteComponent = ChakraComponent<'blockquote', {}>;

const Blockquote = (({ children }: BoxProps) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('pink.500', 'red.200');

  return (
    <Box
      as="blockquote"
      my="5"
      paddingY="4"
      paddingX="5"
      borderLeft="4px solid"
      borderColor={borderColor}
      borderRadius="sm"
      backgroundColor={backgroundColor}
      sx={{ p: { margin: 0 } }}
    >
      {children}
    </Box>
  );
}) as BlockquoteComponent;

export default Blockquote;
