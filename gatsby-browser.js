/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import DefaultLayout from './src/layouts/default';

export const wrapRootElement = ({ element }) => (
  <ChakraProvider>
    <CSSReset />
    {element}
  </ChakraProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <DefaultLayout {...props}>
    {element}
  </DefaultLayout>
);
