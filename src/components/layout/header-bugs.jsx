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
    transform: translateY(-5px);
  }
  
  40%, 100% {
    transform: translateY(0px);
  }
`;

const bugsOnHover = css`  
  &:hover {
    text-decoration: none;
    span {
      animation: ${wavy} 1s ease-in-out infinite;
      animation-delay: calc(0.2s * var(--bug-i));
    }
  }
`;

const HeaderBugs = () => (
  <ChakraLink
    as={GatsbyLink}
    css={bugsOnHover}
    to="/"
    display="flex"
    fontSize={['lg', 'xl']}
    letterSpacing="wider"
    aria-label="To home page"
  >
    {Array.from({ length: 4 }, (_, index) => (
      <span
        key={index}
        style={{ '--bug-i': index + 1, display: 'inline-block' }}
      >
        🐛
      </span>
    ))}
  </ChakraLink>
);

export default HeaderBugs;
