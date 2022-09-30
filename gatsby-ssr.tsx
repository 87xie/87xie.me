import { GatsbySSR } from 'gatsby';

export {
  wrapPageElement,
} from './gatsby-browser';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: 'zh-Hant' });
};
