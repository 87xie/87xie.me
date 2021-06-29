import React from 'react';
import DefaultLayout from './src/components/layout/default-layout';

export const wrapPageElement = ({ element, props }) => (
  <DefaultLayout {...props}>
    {element}
  </DefaultLayout>
);
