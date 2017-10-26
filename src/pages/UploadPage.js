import React, { Component } from "react";
import { connect } from "react-redux";
import UploadForm from "../components/forms/UploadForm";
import { uploadLogs } from "../actions/logs";

class UploadPage extends Component {
  submit = formData =>
    this.props.uploadLogs(formData).then(res => {
      this.props.history.push("/parse");
    });

  render() {
    return (
      <div>
        <h1>Upload Page</h1>
        <UploadForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { uploadLogs })(UploadPage);
