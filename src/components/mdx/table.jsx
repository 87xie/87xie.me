/* eslint-disable react/prop-types */
import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledTable = styled.table`
  width: 100%;
  margin: 2rem 0;
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
    background: ${(props) => props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#F7FAFC'};
  }
`;

const Table = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box overflowX="scroll">
      <StyledTable colorMode={colorMode}>
        {children}
      </StyledTable>
    </Box>
  );
};

export default Table;
