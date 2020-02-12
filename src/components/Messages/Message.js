import React, { Component } from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";

export default class Message extends Component {
  isOwnMessage = (message, user) => {
    return message.user.id == user.uid ? "message__self" : "";
  };
  timeFromNow = time => moment(time).fromNow();
  render() {
    const { message, user } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={this.isOwnMessage(message, user)}>
          <Comment.Author as="a">{message.user.name}</Comment.Author>
          <Comment.Metadata>
            {this.timeFromNow(message.timestamp)}
          </Comment.Metadata>
          {message.hasOwnProperty("image") ? (
            <Image src={message.image} style={{ padding: "1em" }} />
          ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    );
  }
}
