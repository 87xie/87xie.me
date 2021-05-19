import React from 'react';
import DefaultLayout from './src/layouts/default/default-layout';

export const wrapPageElement = ({ element, props }) => (
  <DefaultLayout {...props}>
    {element}
  </DefaultLayout>
);
