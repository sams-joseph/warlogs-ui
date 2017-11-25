import React from 'react';
import styled from 'styled-components';
import constants from '../constants';

const TableColumn = styled.div`
  width: auto;
`;

const TableColumnFull = styled.div`
  flex: 1;
`;

const TableCell = styled.div`
  align-items: center;
  background: ${constants.canvasColor};
  border-bottom: 1px solid ${constants.highlightColor};
  display: flex;
  font-size: 12px;
  height: 40px;
  padding: 0 20px;

  &:first-child {
    background: ${constants.darkBackground};
    height: 55px;
  }

  &:nth-child(2n) {
    background: ${constants.stripeColor};
  }
`;

const Table = ({data, headers, maxHeight, colSizes}) => {
  const TableContainer = styled.section`
    color: white;
    display: flex;
    width: 100%;
    max-height: ${maxHeight};
    overflow-y: auto;
  `;

  const columns = [];

  for (let i = 0; i < data.length; i++) {
    if (colSizes[i] === 1) {
      columns.push(
        <TableColumn>
          <TableCell>{headers[i]}</TableCell>
          {
            data[i].map((cell, index) => (<TableCell key={`name-cell_${index}`}>{cell}</TableCell>))
          }
        </TableColumn>,
      );
    } else {
      columns.push(
        <TableColumnFull>
          <TableCell>{headers[i]}</TableCell>
          {
            data[i].map((cell, index) => (<TableCell key={`name-cell_${index}`}>{cell}</TableCell>))
          }
        </TableColumnFull>,
      );
    }
  }

  return (
    <TableContainer>
      {columns}
    </TableContainer>
  );
};


export default Table;
