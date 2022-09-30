import { css } from '@emotion/react';
import {
  Box,
  useColorMode,
  BoxProps,
} from '@chakra-ui/react';

const wrapperCss = css`
  h3, h4, h5, h6 {
    line-height: var(--chakra-lineHeights-base);
  }
  h3, h4, h5, h6, strong {
    font-weight: var(--chakra-fontWeights-bold);
  }
  h3 {
    font-size: var(--chakra-fontSizes-xl);
  }
  h3, h4, h5, h6 {
    margin: var(--chakra-space-4) 0;
  }
  p {
    margin-bottom: var(--chakra-space-3);
  }
  p, li {
    font-size: var(--chakra-fontSizes-md);
    line-height: var(--chakra-lineHeights-tall);
  }
  ul, ol {
    margin-bottom: var(--chakra-space-6);
    padding-left: var(--chakra-space-7);
    li {
      margin: var(--chakra-space-2) 0;
      ul {
        margin: var(--chakra-space-1) 0;
      }
    }
  }
  hr {
    margin: var(--chakra-space-8) 0;
  }
  
  &[data-color-mode="dark"] {
    h2, h3 {
      color: var(--chakra-colors-pink-200);
    }
  }
  
  &[data-color-mode="light"] {
    h2, h3 {
      color: var(--chakra-colors-pink-500);
    }
  }
`;

const Wrapper = ({ children }: BoxProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      css={wrapperCss}
      data-color-mode={colorMode}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
