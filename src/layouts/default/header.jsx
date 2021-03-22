import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
  Box,
  Flex,
  Grid,
  Text,
  Link as ChakraLink,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import {
  FiMoon,
  FiSun,
  FiTag,
  FiBook,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <Box
      as="header"
      width="100%"
      zIndex="sticky"
      position="sticky"
      top="0"
      borderBottom="1px"
      borderColor="inherit"
      background={isDarkMode ? 'gray.800' : 'white'}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        height="65px"
        px="6"
      >
        <Box>
          <Text as={GatsbyLink} to="/" fontSize={['md', 'md', 'xl']}>
            🐛🐛🐛🐛
          </Text>
        </Box>

        <Grid gridAutoFlow="column" gridTemplateColumns="repeat(5, 32px)" alignItems="center">
          <ChakraLink
            as={GatsbyLink}
            to="/blog"
            textAlign="center"
          >
            <Icon as={FiBook} />
          </ChakraLink>
          <ChakraLink
            as={GatsbyLink}
            to="/tags"
            textAlign="center"
          >
            <Icon as={FiTag} />
          </ChakraLink>
          <ChakraLink
            isExternal
            href="https://www.linkedin.com/in/oscar-87-xie/"
            textAlign="center"
          >
            <Icon as={FiLinkedin} />
          </ChakraLink>
          <ChakraLink
            isExternal
            href="https://github.com/Oscar87Xie"
            textAlign="center"
          >
            <Icon as={FiGithub} />
          </ChakraLink>

          <ChakraLink
            textAlign="center"
            color={isDarkMode ? 'orange.300' : 'gray.500'}
            onClick={toggleColorMode}
          >
            <Icon as={isDarkMode ? FiSun : FiMoon} />
          </ChakraLink>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Header;
