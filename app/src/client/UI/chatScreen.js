import React from 'react';
const SocketClient = require('socket.io-client');

import './chatScreen.css';
import { connect } from 'react-redux';
import {
  setUImessage,
  setConnectedStatus,
  setUserList,
  setUserJoined,
  setUserRemoved,
  commandInvoked
} from '../actions/actions';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.chatSocket = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderChat = this.renderChat.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  initSocket() {
    let settings;
    if (window.location.protocol == 'http') {
      console.log('Connecting on HTTP');
      settings = {
        reconnection: false,
        autoConnect: false,
        transports: ['websocket'],
      };
    } else {
      console.log('Connecting on HTTPS');
      settings = {
        secure: true,
        reconnection: false,
        autoConnect: false,
        transports: ['websocket'],
      };
    }

    global.chatSocket = SocketClient('/', settings);

    global.chatSocket.on('connect', () => {
      this.props.dispatch(setConnectedStatus(true));
      global.chatSocket.emit(
        'join',
        this.props.auth.userid,
        this.props.auth.username,
        this.props.auth.token
      );
    });

    global.chatSocket.on('disconnect', () => {
      this.props.dispatch(setConnectedStatus(false));
    });

    global.chatSocket.on('users', (users) => {
      this.props.dispatch(setUserList(users));
    });

    global.chatSocket.on('joined', (user) => {
      this.props.dispatch(setUserJoined(user));
    });

    global.chatSocket.on('chat', (message) => {
      console.log('chat message', message)
      const type = 'chat';
      const currentDate = new Date();
      this.props.dispatch(
        setUImessage(currentDate, message.userid, message.content, type)
      );
    });

    global.chatSocket.on('left', (userid) => {
      this.props.dispatch(setUserRemoved(userid));
    });

    // private message
    global.chatSocket.on('private', (data) => {
      console.log('private message', data)
      const type = 'private';
      const currentDate = new Date();
      this.props.dispatch(
        setUImessage(currentDate, data.from, data.message, type)
      );
    })

    global.chatSocket.connect();
  }

  componentDidMount() {
    this.initSocket();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {

    if(this.state.value.startsWith('/')) {
      this.props.dispatch(commandInvoked(this.state.value, this.props.chat.users));
      this.setState({ value: '' });
    } else {
      global.chatSocket.emit('msg', {
        content: this.state.value,
      });
      this.setState({ value: '' });
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  }

  renderChat() {
    const { messages } = this.props.chat;
    return messages.map((message, index) => (
      <div key={index}>
        <span>{message.username}:</span>
        <span style={{fontStyle: message.type === "private" ? 'italic': 'chat'}}>{message.content}</span>
      </div>
    ));
  }

  render() {
    const connectedStatus = this.props.chat.connectedStatus;

    if (!connectedStatus) {
      return <h4>Connecting...</h4>;
    }
    return (
      <div className="container">
        <div className="window">
          <div className="chats">{this.renderChat()}</div>
          <div className="new-chat">
            <input
              type="text"
              id="message"
              onChange={this.handleChange}
              value={this.state.value}
              onKeyPress={this.handleKeyPress}
            />
            <button id="send" onClick={this.handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    chat: state.chat,
  };
};

export default connect(mapStateToProps)(ChatScreen);
