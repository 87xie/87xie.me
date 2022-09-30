/* eslint-disable react/prop-types */
// TODO: types
import Prism from './code-block-prism';
import Mermaid from './code-block-mermaid';

// @ts-ignore
const CodeBlock = ({ children }) => {
  const languageClassName = (children.props.className || '').toLowerCase();
  const language = languageClassName.replace(/language-/, '');
  const code = children?.props?.children?.trim() || '';

  if (!code) return null;

  switch (language) {
    case 'mermaid':
      return <Mermaid code={code} />;
    default:
      return (
        <Prism
          code={code}
          language={language}
        />
      );
  }
};

export default CodeBlock;
