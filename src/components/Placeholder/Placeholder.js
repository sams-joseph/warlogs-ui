import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";

function Placeholder() {
  return (
    <Table>
      <TableHeader>
        <TableHeaderColumn>l</TableHeaderColumn>
        <TableHeaderColumn>l</TableHeaderColumn>
        <TableHeaderColumn>l</TableHeaderColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>l</TableRowColumn>
          <TableRowColumn>l</TableRowColumn>
          <TableRowColumn>l</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default Placeholder
