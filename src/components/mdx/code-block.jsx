/* eslint-disable */
import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

const StyledPre = styled.pre`
  margin: 1em 0;
  border-radius: .3em;
  padding: 1.5em;
  text-align: left;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
  padding-right: 1.5em;
`;

const CodeBlock = ({ children }) => {
  const { colorMode } = useColorMode();
  const language = children.props.className.replace(/language-/, '') || '';

  return (
    <Highlight
      {...defaultProps}
      code={children.props.children.trim()}
      language={language}
      theme={colorMode === 'dark' ? oceanicNext : duotoneLight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </StyledPre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
