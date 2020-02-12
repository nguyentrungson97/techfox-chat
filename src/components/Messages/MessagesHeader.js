import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

export default class MessagesHeader extends Component {
  render() {
    const { channel, handleSearch } = this.props;
    console.log(channel);
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {channel ? `#${channel.name}` : ``}
            <Icon name="star outline" color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>
        {/* Search */}
        <Header floated="right">
          <Input
            onChange={handleSearch}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}
