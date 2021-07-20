/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import {
  Button,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

const StyledWrapper = styled.div`
  position: relative;
  margin: var(--chakra-space-7) 0;
  &[data-language]::after {
    content: attr(data-language);
    display: inline-block;
    position: absolute;
    top: 0rem;
    left: 1.25rem;
    padding: 0.1rem 0.5rem;
    border-radius: 0px 0px 0.25rem 0.25rem;
    background: #D9D7E0;
    color: rgb(35, 33, 41);
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.025rem;
    line-height: 1.2rem;
  }

  &[data-language="typescript"]::after,
  &[data-language="ts"]::after {
    background: rgb(0, 122, 204);
  }
  
  &[data-language="javascript"]::after,
  &[data-language="js"]::after {
    background: rgb(247, 223, 30);
  }
  &[data-language="jsx"]::after {
    background: rgb(97, 218, 251);
  }
  
  &[data-language="css"]::after {
    background: #2965f1;
  }
  
  &[data-language="sass"]::after,
  &[data-language="scss"]::after {
    background: rgb(207, 100, 154);
  }
  
  &[data-language="html"]::after {
    background: rgb(255, 87, 51);
  }
  
  &[data-language="html"]::after
  &[data-language="sass"]::after
  &[data-language="scss"]::after
  &[data-language="ts"]::after
  &[data-language="typescript"]::after {
    color: #fff;
  }
`;

const StyledPre = styled.pre`
  border-radius: .3em;
  padding: 2.25em 1.5em 1.5em;
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

const PrismHighlighter = ({ code, language }) => {
  const prismTheme = useColorModeValue(duotoneLight, oceanicNext);
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <StyledWrapper data-language={language || undefined}>
      <Button
        size="xs"
        colorScheme="blue"
        position="absolute"
        top=".75em"
        right=".75em"
        onClick={onCopy}
      >
        {hasCopied ? 'copied' : 'copy'}
      </Button>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={prismTheme}
      >
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <StyledPre className={className} style={style}>
            {tokens.map((line, lineIndex) => (
              <Line
                key={`line-${lineIndex}`}
                {...getLineProps({ line, key: lineIndex })}
              >
                <LineNo>{lineIndex + 1}</LineNo>
                <LineContent>
                  {line.map((token, lineContentIndex) => (
                    <span
                      key={lineContentIndex}
                      {...getTokenProps({ token, key: lineContentIndex })}
                    />
                  ))}
                </LineContent>
              </Line>
            ))}
          </StyledPre>
        )}
      </Highlight>
    </StyledWrapper>
  );
};

PrismHighlighter.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default PrismHighlighter;
