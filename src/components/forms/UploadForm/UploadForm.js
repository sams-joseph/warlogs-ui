import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class UploadForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    const files = this.filesInput.files;
    formData.append("combatLog", files[0]);
    this.props.submit(formData);
  };

  render() {
    return (
      <section>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <input
              type="file"
              ref={input => {
                this.filesInput = input;
              }}
              name="combatLog"
            />
          </Form.Field>
          <Button type="submit">Upload</Button>
        </Form>
      </section>
    );
  }
}
