import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import TextField from "material-ui/TextField";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import RaisedButton from "material-ui/RaisedButton";
import Dropzone from "react-dropzone";

export default class UploadForm extends Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    const files = this.state.files;
    formData.append("combatLog", files[0]);
    this.props.submit(formData);
  };

  onDrop = files => {
    this.setState({
      files
    });
  };

  render() {
    const textFieldStyle = {
      marginRight: "10px",
      width: "32%"
    };
    return (
      <section>
        <Dropzone
          onDrop={this.onDrop}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            maxHeight: "400px",
            border: "2px dashed #373D4A",
            background: "#262A33",
            borderRadius: "0px",
            marginBottom: "30px"
          }}
        >
          <div className="dropzone-label">
            <center>
              <FileUpload
                color="#485061"
                style={{ height: "65px", width: "65px" }}
              />
            </center>
            <p style={{ color: "#485061", fontSize: "1.25em" }}>
              Drop files or click to select
            </p>
          </div>
        </Dropzone>
        <RaisedButton primary label="Upload" onClick={this.onSubmit} />
      </section>
    );
  }
}
