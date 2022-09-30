import {
  Link as ChakraLink,
  Heading as ChakraHeading,
  useColorModeValue,
} from '@chakra-ui/react';

const toKebabCase = (string = '') => string
  .trim()
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

interface HeadingProps {
  children: string;
}

const HeadingWithHashLink = ({ children }: HeadingProps) => {
  const id = toKebabCase(children ?? '');
  const hashColor = useColorModeValue('blue.500', 'blue.200');

  if (!id) return null;

  return (
    <ChakraHeading
      display="flex"
      alignItems="center"
      marginY="6"
      borderBottom="1px solid"
      borderColor="inherit"
      paddingBottom="2"
      fontSize="2xl"
      scrollMarginTop="75px"
      as="h2"
      sx={{
        '.hash-link': {
          opacity: 0,
        },
        '.hash-link:focus': {
          opacity: 1,
        },
        '&:hover .hash-link': {
          opacity: 1,
        },
      }}
      id={id}
    >
      <span>{children}</span>
      <ChakraLink
        className="hash-link"
        display="inline-block"
        marginLeft="2"
        fontSize="lg"
        color={hashColor}
        href={`#${id}`}
      >
        #
      </ChakraLink>
    </ChakraHeading>
  );
};

export default HeadingWithHashLink;