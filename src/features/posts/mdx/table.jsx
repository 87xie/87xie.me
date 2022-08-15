import {
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { css } from '@emotion/react';

const tableCss = css`
  width: 100%;
  th, td {
    padding: 1rem 1.5rem;
    font-size: .875rem;
  }

  th {
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
  }
  
  tr:nth-of-type(2n+1) td {
    background: var(--chakra-colors-gray-100);
  }
  
  &[data-color-mode="dark"] {
    tr:nth-of-type(2n+1) td {
      background: var(--chakra-colors-gray-700);
    }
  }
`;

const Table = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      marginBottom="7"
      border="1px"
      borderColor="inherit"
      borderRadius="12px"
      overflowX="scroll"
    >
      <table css={tableCss} data-color-mode={colorMode}>
        {children}
      </table>
    </Box>
  );
};

export default Table;
