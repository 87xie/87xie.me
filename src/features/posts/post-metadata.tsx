/* eslint-disable react/jsx-no-constructed-context-values */
import {
  useContext,
  createContext,
  ReactNode,
} from 'react';
import {
  Flex,
  Text,
  Tag as ChakraTag,
  Link as ChakraLink,
  Heading as ChakraHeading,
  useColorModeValue,
  TextProps,
  HeadingProps,
  TagProps as ChakraTagProps,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

export const Heading = (props: HeadingProps) => (
  <ChakraHeading
    as="h1"
    fontSize="3xl"
    {...props}
  />
);

interface TagGroupContextType {
  size?: 'md' | 'lg';
  gap?: string;
}

const TagGroupContext = createContext<TagGroupContextType>({
  size: 'md',
  gap: '1.5',
});
TagGroupContext.displayName = 'TagGroupContext';

interface TagGroupProps extends TagGroupContextType {
  children: ReactNode;
}

export const TagGroup = ({
  children,
  size = 'md',
  gap = '1.5',
}: TagGroupProps) => (
  <TagGroupContext.Provider value={{ size, gap }}>
    <Flex
      wrap="wrap"
      m={`-${gap}`}
    >
      {children}
    </Flex>
  </TagGroupContext.Provider>
);

interface TagProps extends ChakraTagProps {
  to: string;
  children: ReactNode;
}

export const Tag = ({
  to,
  children,
  size: sizeProp,
  ...rest
}: TagProps) => {
  const {
    gap: groupGap,
    size: groupSize = 'md',
  } = useContext(TagGroupContext);

  return (
    <ChakraLink
      as={GatsbyLink}
      to={to}
      m={groupGap}
    >
      <ChakraTag
        colorScheme="red"
        size={sizeProp ?? groupSize}
        {...rest}
      >
        {children}
      </ChakraTag>
    </ChakraLink>
  );
};

export const Date = (props: TextProps) => (
  <Text
    as="small"
    fontSize="xs"
    fontWeight="bold"
    display="inline-block"
    color={useColorModeValue('gray.600', 'gray.400')}
    {...props}
  />
);
