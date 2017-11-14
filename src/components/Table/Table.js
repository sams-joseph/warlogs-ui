import React, { Component } from "react";
import { Table as SemanticTable } from "semantic-ui-react";
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableHeaderColumn as MaterialTableHeaderColumn,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn
} from "material-ui/Table";
import { calculatePerSecond, calculateTotalAmount } from "../../utils/data";

class Table extends Component {
  render() {
    const { data, cells, headers, cellWidth, maxHeight } = this.props;
    const tableRow = data.map(row => {
      const rowCells = [];
      for (let i = 0; i < cells; i++) {
        rowCells.push(
          <MaterialTableRowColumn
            style={{
              width: `${cellWidth[i]}rem`
            }}
          >
            {row[i]}
          </MaterialTableRowColumn>
        );
      }
      return <MaterialTableRow key={row[0]}>{rowCells}</MaterialTableRow>;
    });
    const headerCells = [];
    for (let i = 0; i < headers.length; i++) {
      headerCells.push(
        <MaterialTableHeaderColumn
          style={{
            width: `${cellWidth[i]}rem`
          }}
        >
          {headers[i]}
        </MaterialTableHeaderColumn>
      );
    }

    return (
      <MaterialTable height={maxHeight}>
        <MaterialTableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          style={{ background: "#16191C" }}
        >
          <MaterialTableRow>{headerCells}</MaterialTableRow>
        </MaterialTableHeader>

        <MaterialTableBody displayRowCheckbox={false} stripedRows>
          {tableRow}
        </MaterialTableBody>
      </MaterialTable>
    );
  }
}

export default Table;
