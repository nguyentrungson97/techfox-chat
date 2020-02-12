import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default class FileModal extends Component {
  state = {
    file: null,
    authorized: []
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        file
      });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file != null) {
      const metadata = { contentType: file.type };
      uploadFile(file, metadata);
      closeModal();
      this.clearFile();
    }
  };

  clearFile = () => {
    this.setState({
      file: null
    });
  };
  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label="File"
            name="file"
            type="file"
            accept="image/png,image/gif,image/jpeg,image/jpg"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
            <Icon name="checkmark" /> Send
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
