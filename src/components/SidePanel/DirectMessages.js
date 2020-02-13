import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";

export default class DirectMessages extends Component {
  state = {
    users: [],
    currentUser: this.props.currentUser,
    usersRef: firebase.database().ref("users")
  };

  componentDidMount() {
    if (this.state.currentUser) {
      this.addListeners(this.state.currentUser.uid);
    }
  }

  addListeners = currentUserId => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", snap => {
      if (currentUserId != snap.key) {
        let user = snap.val();
        user.uid = snap.key;
        user.status = "offline";
        this.setState({
          users: loadedUsers
        });
      }
    });
    console.log(loadedUsers);
  };

  render() {
    const { users } = this.state;
    return (
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="mail" />
            Direct Message
          </span>
          {` (${users.length})`}
        </Menu.Item>
      </Menu.Menu>
    );
  }
}
