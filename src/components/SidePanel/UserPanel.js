import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

class UserPanel extends Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signin as <strong>Users</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
      disabled: false
    },
    {
      key: "signout",
      text: <span>Sign Out</span>,
      disabled: false
    }
  ];

  render() {
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>TechFoxChat</Header.Content>
            </Header>
            {/* End Header */}
            {/* User */}
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={<span>User</span>}
                options={this.dropdownOptions()}
              ></Dropdown>
            </Header>
            {/* End User */}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
