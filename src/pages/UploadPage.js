import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import UploadForm from "../components/forms/UploadForm";
import { uploadLogs } from "../actions/logs";

class UploadPage extends Component {
  submit = formData =>
    this.props.uploadLogs(formData).then(res => {
      this.props.history.push("/parse");
    });

  render() {
    return (
      <div className="container">
        <Header as="h2" inverted>
          Upload Page
        </Header>
        <UploadForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { uploadLogs })(UploadPage);
