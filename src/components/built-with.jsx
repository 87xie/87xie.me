import React from 'react';
import {
  Box,
  Link,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import GatsbySvg from '@/assets/svgs/gatsby.svg';
import ChakraSvg from '@/assets/svgs/chakra-ui.svg';
import MermaidSvg from '@/assets/svgs/mermaid.svg';
import NetlifySvg from '@/assets/svgs/netlify.svg';
import MdxSvg from '@/assets/svgs/mdx.svg';

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
  { svg: NetlifySvg, href: 'https://www.netlify.com/' },
  { svg: GatsbySvg, href: 'https://github.com/gatsbyjs/gatsby' },
  { svg: ChakraSvg, href: 'https://github.com/chakra-ui/chakra-ui' },
  { svg: MermaidSvg, href: 'https://github.com/mermaid-js/mermaid' },
  { svg: MdxSvg, href: 'https://github.com/mdx-js/mdx' },
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
      {items.map(({ href, svg: SvgComponent }) => (
        <Link
          key={href}
          href={href}
          isExternal
          className="logo-group__logo"
        >
          <SvgComponent />
        </Link>
      ))}
    </StyledLogoGroup>
  </Box>
);

export default BuildWith;
