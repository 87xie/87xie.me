import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import {
  css,
  keyframes,
} from '@emotion/react';

const wavy = keyframes`
  0% {
    transform: translateY(0px);
  }
  
  20% {
    transform: translateY(-4px);
  }
  
  40%, 100% {
    transform: translateY(0px);
  }
`;

const linkCss = css`
  [data-bug] {
    display: inline-block;  
  }

  &:hover {
    text-decoration: none;
    [data-bug] {
      animation: ${wavy} 1s ease-in-out infinite;
    }
    [data-bug="1"] {
      animation-delay: 0.2s;
    }
    [data-bug="2"] {
      animation-delay: 0.4s;
    }
    [data-bug="3"] {
      animation-delay: 0.6s;
    }
    [data-bug="4"] {
      animation-delay: 0.8s;
    }
  }
`;

const HeaderBugs = () => (
  <ChakraLink
    as={GatsbyLink}
    css={linkCss}
    to="/"
    display="flex"
    fontSize={['lg', 'xl']}
    letterSpacing="wider"
    aria-label="To home page"
  >
    {Array.from({ length: 4 }, (_, index) => (
      <span key={index} data-bug={index + 1}>
        🐛
      </span>
    ))}
  </ChakraLink>
);

export default HeaderBugs;
