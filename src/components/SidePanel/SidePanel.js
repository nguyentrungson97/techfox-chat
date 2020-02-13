import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channel from "./Channel";
import DirectMessages from "./DirectMessages";

class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#2851A3", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser}></UserPanel>
        <Channel currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
