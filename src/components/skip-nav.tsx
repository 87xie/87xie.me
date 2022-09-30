import { css } from '@emotion/react';
import {
  Box,
  Link as ChakraLink,
  useColorMode,
} from '@chakra-ui/react';

const linkCss = css`
  position: fixed;
  top: 0;
  left: 0px;
  border-radius: 4px;
  padding: 4px 20px;
  opacity: 0;
  font-size: 14px;
  z-index: 9999;
  &:focus {
    opacity: 1;
  }
  &[data-color-mode="light"] {
    background: var(--chakra-colors-gray-100);
  }
  &[data-color-mode="dark"] {
    background: var(--chakra-colors-gray-600);
  }
`;

const id = '87xie-skip-nav';

const SkipNavLink = () => {
  const { colorMode } = useColorMode();
  return (
    <ChakraLink
      css={linkCss}
      href={`#${id}`}
      data-skip-nav=""
      data-color-mode={colorMode}
    >
      Skip to main content
    </ChakraLink>
  );
};

const SkipNavContent = () => (
  <Box
    id={id}
    position="relative"
    top="-80px"
  />
);

export {
  SkipNavLink,
  SkipNavContent,
};
