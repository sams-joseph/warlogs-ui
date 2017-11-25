import React from 'react';
import PropTypes from 'prop-types';
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

const Table = ({
  data, headers, colSizes,
}) => {
  const TableContainer = styled.section`
    color: white;
    display: flex;
    width: 100%;
  `;

  const columns = [];

  for (let i = 0; i < data.length; i += 1) {
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

const {
  number,
  string,
  arrayOf,
} = PropTypes;
Table.propTypes = {
  data: arrayOf(),
  headers: arrayOf(string),
  colSizes: arrayOf(number),
};

export default Table;
