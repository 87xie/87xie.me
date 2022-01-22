import {
  Box,
  Link,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledLogoGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -1em;
  .logo-group__logo {
    display: inline-block;
    margin: 0 1em 1em 0;
  }
`;
const items = [
  {
    imgProps: {
      src: '/images/netlify.svg',
      width: 40,
      height: 40,
    },
    href: 'https://www.netlify.com/',
    ariaLabel: 'Go to netlify.com',
  },
  {
    imgProps: {
      src: '/images/gatsby.svg',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/gatsbyjs/gatsby',
    ariaLabel: 'Go to Gatsby GitHub page',
  },
  {
    imgProps: {
      src: '/images/chakra-ui.svg',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/chakra-ui/chakra-ui',
    ariaLabel: 'Go to Chakra UI GitHub page',
  },
  {
    imgProps: {
      src: '/images/mermaid.svg',
      width: 40,
      height: 40,
    },
    href: 'https://github.com/mermaid-js/mermaid',
    ariaLabel: 'Go to mermaid GitHub page',
  },
  {
    imgProps: {
      src: '/images/mdx.svg',
      width: 96.6,
      height: 40,
    },
    href: 'https://github.com/mdx-js/mdx',
    ariaLabel: 'Go to mdx-js GitHub page',
  },
];

const BuildWith = () => (
  <Box>
    <Heading
      as="h2"
      fontSize="2xl"
      marginBottom="3"
      color={useColorModeValue('gray.600', 'gray.200')}
    >
      Built With
    </Heading>
    <StyledLogoGroup>
      {items.map(({ href, imgProps, ariaLabel }) => (
        <Link
          isExternal
          key={href}
          href={href}
          aria-label={ariaLabel}
          className="logo-group__logo"
        >
          <img {...imgProps} alt={ariaLabel} />
        </Link>
      ))}
    </StyledLogoGroup>
  </Box>
);

export default BuildWith;
