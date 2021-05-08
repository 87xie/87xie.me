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
  css,
  keyframes,
} from '@emotion/react';
import {
  FiMoon,
  FiSun,
  FiTag,
  FiBook,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';

const wavy = keyframes`
  0% {
    transform: translateY(0px);
  }
  
  20% {
    transform: translateY(-5px);
  }
  
  40%, 100% {
    transform: translateY(0px);
  }
`;

const bugsOnHover = css`  
  .bug {
    display: inline-block;
  }

  &:hover .bug {
    animation: ${wavy} 1s ease-in-out infinite;
    animation-delay: calc(0.2s * var(--bug-i))
  }
`;

const links = [
  {
    to: '/posts',
    icon: FiBook,
    isExternal: false,
  },
  {
    to: '/tags',
    icon: FiTag,
    isExternal: false,
  },
  {
    to: 'https://www.linkedin.com/in/oscar-87-xie/',
    icon: FiLinkedin,
    isExternal: true,
  },
  {
    to: 'https://github.com/Oscar87Xie',
    icon: FiGithub,
    isExternal: true,
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
      borderBottom="1px"
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
        <Text
          to="/"
          as={GatsbyLink}
          display="flex"
          fontSize={['md', 'md', 'xl']}
          letterSpacing="wider"
          css={bugsOnHover}
        >
          <span className="bug" style={{ '--bug-i': 1 }}>
            🐛
          </span>
          <span className="bug" style={{ '--bug-i': 2 }}>
            🐛
          </span>
          <span className="bug" style={{ '--bug-i': 3 }}>
            🐛
          </span>
          <span className="bug" style={{ '--bug-i': 4 }}>
            🐛
          </span>
        </Text>

        <Grid
          gridAutoFlow="column"
          gridTemplateColumns="repeat(5, 32px)"
          alignItems="center"
          gap="1"
        >
          {links.map(({
            to,
            icon,
            isExternal,
          }) => (
            <ChakraLink
              key={to}
              {...(isExternal && { href: to, isExternal })}
              {...(!isExternal && { as: GatsbyLink, to })}
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              height="32px"
              borderRadius="4"
              _hover={{
                color: isDarkMode ? 'red.200' : 'red.800',
                background: isDarkMode ? 'rgba(254, 178, 178, 0.16);' : 'red.100',
              }}
            >
              <Icon as={icon} />
            </ChakraLink>
          ))}

          <ChakraLink
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            height="32px"
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
