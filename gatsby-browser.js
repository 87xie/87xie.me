/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from './src/styles/theme';
import DefaultLayout from './src/layouts/default/default-layout';

export const wrapRootElement = ({ element }) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {element}
  </ChakraProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <DefaultLayout {...props}>
    {element}
  </DefaultLayout>
);
