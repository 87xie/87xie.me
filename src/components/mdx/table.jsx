/* eslint-disable react/prop-types */
import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledTable = styled.table`
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
    background: ${(props) => props.thBackground};
  }
`;

const Table = ({ children }) => {
  const thBackground = useColorModeValue('#F7FAFC', 'rgba(255, 255, 255, 0.06)');

  return (
    <Box overflowX="scroll" marginY="2xl">
      <StyledTable thBackground={thBackground}>
        {children}
      </StyledTable>
    </Box>
  );
};

export default Table;
