import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableHeaderColumn as MaterialTableHeaderColumn,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn
} from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
import { getAllLogs } from "../actions/logs";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      success: false
    };
  }

  componentDidMount() {
    this.props.getAllLogs().then(logs => {
      this.setState({
        success: true
      });
    });
  }

  render() {
    const { logs } = this.props;
    const { success } = this.state;
    const tableRows = logs.map(log => {
      return (
        <MaterialTableRow key={log._id}>
          <MaterialTableRowColumn>
            {moment(log.date).format("MMMM DD, YYYY h:mm A")}
          </MaterialTableRowColumn>
          <MaterialTableRowColumn>
            <Link to={`/log-overview/${log._id}`}>{log.name}</Link>
          </MaterialTableRowColumn>
        </MaterialTableRow>
      );
    });

    return (
      <div className="container">
        {!success ? (
          <CircularProgress
            style={{
              top: "40%",
              left: "calc(50% - 40px)",
              position: "absolute"
            }}
          />
        ) : (
          <div>
            <h2 style={{ marginBottom: "30px", color: "white" }}>
              Recent Logs
            </h2>
            <MaterialTable selectable={false}>
              <MaterialTableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                style={{ background: "#16191C" }}
              >
                <MaterialTableRow>
                  <MaterialTableHeaderColumn>Date</MaterialTableHeaderColumn>
                  <MaterialTableHeaderColumn>Name</MaterialTableHeaderColumn>
                </MaterialTableRow>
              </MaterialTableHeader>

              <MaterialTableBody displayRowCheckbox={false} stripedRows>
                {tableRows}
              </MaterialTableBody>
            </MaterialTable>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.logs.success,
    logs: state.logs.logs
  };
}

export default connect(mapStateToProps, { getAllLogs })(HomePage);
