import { Box, useColorMode } from '@chakra-ui/react';
import { css } from '@emotion/react';

const tableCss = css`
  width: 100%;
  border: 1px solid;
  border-color: inherit;
  th, td {
    padding: .5rem 1rem;
    font-size: .875rem;
  }

  th {
    text-align: left;
    white-space: nowrap;
    font-weight: 600;
  }
  
  &.is-dark th {
    background: rgba(255, 255, 255, 0.06);
  }
  
  &.is-light th {
    background: #F7FAFC;
  }
`;

const Table = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box overflowX="scroll" marginBottom="7">
      <table css={tableCss} className={`is-${colorMode}`}>
        {children}
      </table>
    </Box>
  );
};

export default Table;
