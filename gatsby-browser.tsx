import { GatsbyBrowser } from 'gatsby';
import {
  Layout as DefaultLayout,
} from './src/layouts/default';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => (
  <DefaultLayout>
    {element}
  </DefaultLayout>
);
