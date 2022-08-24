export {
  wrapPageElement,
} from './gatsby-browser';

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'zh-Hant' });
};
