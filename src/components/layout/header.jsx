/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Box,
  Flex,
  Grid,
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
    to: '/search',
    icon: FiSearch,
    isExternal: false,
  },
  {
    to: '/posts',
    icon: FiBook,
    ariaLabel: 'To posts page',
    isExternal: false,
  },
  {
    to: '/tags',
    icon: FiTag,
    ariaLabel: 'To tags page',
    isExternal: false,
  },
  {
    to: 'https://www.linkedin.com/in/oscar-87-xie/',
    icon: FiLinkedin,
    isExternal: true,
    ariaLabel: 'To oscar-87-xie Linkedin page',
  },
  {
    to: 'https://github.com/Oscar87Xie',
    icon: FiGithub,
    isExternal: true,
    ariaLabel: 'To oscar87xie Github page',
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
          {links.map(({ ariaLabel, ...linkProps }) => (
            <HeaderIconLink
              {...linkProps}
              key={linkProps.to}
              aria-label={ariaLabel}
            />
          ))}
          {/* color mode button */}
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
