/* eslint-disable object-curly-newline */
import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import {
  FiMoon,
  FiSun,
  FiTag,
  FiBook,
  FiSearch,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';
import HeaderBugs from './header-bugs';
import HeaderIconLink from './header-icon-link';

const links = [
  {
    to: 'https://github.com/87xie/',
    icon: FiGithub,
    isExternal: true,
    ariaLabel: 'To oscar87xie GitHub page',
  },
];

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
      borderColor="inherit"
      background={isDarkMode ? 'gray.800' : 'white'}
      transition="border-color 0.2s, background-color 0.2s"
    >
      <Flex
        maxWidth="5xl"
        margin="0 auto"
        alignItems="center"
        justifyContent="space-between"
        height="65px"
        px="6"
      >
        {/* hedaer-left */}
        <HeaderBugs />
        {/* header-right */}
        <Grid
          gridAutoFlow="column"
          alignItems="center"
          gap={[0, 1]}
        >
          <HeaderIconLink
            as={GatsbyLink}
            to="/search"
            aria-label="To search page"
          >
            <Icon as={FiSearch} />
          </HeaderIconLink>

          <HeaderIconLink
            as={GatsbyLink}
            to="/posts"
            aria-label="To posts page"
          >
            <Icon as={FiBook} />
          </HeaderIconLink>

          <HeaderIconLink
            as={GatsbyLink}
            to="/tags"
            aria-label="To tags page"
          >
            <Icon as={FiTag} />
          </HeaderIconLink>

          <HeaderIconLink
            isExternal
            href="https://www.linkedin.com/in/87xie/"
            aria-label="To 87xie Linkedin page"
          >
            <Icon as={FiLinkedin} />
          </HeaderIconLink>

          <HeaderIconLink
            isExternal
            href="https://github.com/87xie/"
            aria-label="To 87xie GitHub page"
          >
            <Icon as={FiGithub} />
          </HeaderIconLink>
          <IconButton
            aria-label={`Switch to ${colorMode} mode`}
            size="sm"
            fontSize="16px"
            variant="ghost"
            borderRadius="4"
            _hover={{ background: 'none' }}
            _active={{ background: 'none' }}
            color={isDarkMode ? 'orange.300' : 'gray.500'}
            icon={isDarkMode ? <FiSun /> : <FiMoon />}
            onClick={toggleColorMode}
          />
        </Grid>
      </Flex>
    </Box>
  );
};

export default Header;
