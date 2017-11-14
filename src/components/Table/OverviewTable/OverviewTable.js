import React, { Component } from "react";
import LinearProgress from "material-ui/LinearProgress";
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableHeaderColumn as MaterialTableHeaderColumn,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn
} from "material-ui/Table";

function OverviewTable({ rows, headers }) {
  return (
    <MaterialTable selectable={false} height="240px">
      <MaterialTableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        style={{ background: "#16191C" }}
      >
        <MaterialTableRow>
          <MaterialTableHeaderColumn style={{ width: "2rem" }}>
            {headers[0]}
          </MaterialTableHeaderColumn>
          <MaterialTableHeaderColumn style={{ width: "8rem" }}>
            {headers[1]}
          </MaterialTableHeaderColumn>
          <MaterialTableHeaderColumn style={{ width: "2rem" }}>
            {headers[2]}
          </MaterialTableHeaderColumn>
        </MaterialTableRow>
      </MaterialTableHeader>
      <MaterialTableBody displayRowCheckbox={false} stripedRows>
        {rows}
      </MaterialTableBody>
    </MaterialTable>
  );
}

export default OverviewTable;
