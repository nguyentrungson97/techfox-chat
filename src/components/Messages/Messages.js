import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import firebase from "../../firebase";
import Message from "./Message";

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: [],
    messagesLoading: true,
    searchKeyword: "",
    searchResult: []
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessage = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessage.push(snap.val());
      this.setState({
        messages: loadedMessage,
        messagesLoading: false
      });
    });
  };

  handleSearch = event => {
    this.setState(
      {
        searchKeyword: event.target.value.toLowerCase().trim()
      },
      () => {
        this.search();
      }
    );
  };

  search = () => {
    const messageChannel = [...this.state.messages];
    const searchResult = messageChannel.reduce((result, message) => {
      if (
        message.content &&
        message.content.toLowerCase().search(this.state.searchKeyword) >= 0
      ) {
        result.push(message);
      }
      return result;
    }, []);
    this.setState({
      searchResult
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));
  render() {
    const {
      messagesRef,
      channel,
      user,
      messages,
      searchKeyword,
      searchResult
    } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader channel={channel} handleSearch={this.handleSearch} />
        <Segment>
          <Comment.Group className="messages">
            {searchKeyword
              ? this.displayMessages(searchResult)
              : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessagesForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
