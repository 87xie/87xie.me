import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@styles/theme';

export {
  wrapRootElement,
  wrapPageElement,
} from './gatsby-browser';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ]);
};
