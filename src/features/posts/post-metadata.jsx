/* eslint-disable react/jsx-no-constructed-context-values */
import {
  useContext,
  createContext,
} from 'react';
import {
  Flex,
  Text,
  Tag as ChakraTag,
  Link as ChakraLink,
  Heading as ChakraHeading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

export const Heading = (props) => (
  <ChakraHeading
    as="h1"
    fontSize="3xl"
    {...props}
  />
);

const TagGroupContext = createContext({
  size: 'md',
  gap: undefined,
});
TagGroupContext.displayName = 'TagGroupContext';

export const TagGroup = ({
  size = 'md',
  gap = '1.5',
  ...rest
}) => (
  <TagGroupContext.Provider value={{ size, gap }}>
    <Flex
      wrap="wrap"
      m={`-${gap}`}
      {...rest}
    />
  </TagGroupContext.Provider>
);

export const Tag = ({
  to,
  children,
  size: sizeProp,
  ...rest
}) => {
  const {
    gap: groupGap = undefined,
    size: groupSize = 'md',
  } = useContext(TagGroupContext);

  return (
    <ChakraLink
      as={GatsbyLink}
      to={to}
      m={groupGap}
      {...rest}
    >
      <ChakraTag colorScheme="red" size={sizeProp ?? groupSize}>
        {children}
      </ChakraTag>
    </ChakraLink>
  );
};

export const Date = (props) => (
  <Text
    as="small"
    fontSize="xs"
    fontWeight="bold"
    display="inline-block"
    color={useColorModeValue('gray.600', 'gray.400')}
    {...props}
  />
);
