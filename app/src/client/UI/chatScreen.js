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
} from '../actions/actions';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.chatSocket = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    this.chatSocket = SocketClient('/', settings);

    this.chatSocket.on('connect', () => {
      this.props.dispatch(setConnectedStatus(true));
      this.chatSocket.emit(
        'join',
        this.props.auth.userid,
        this.props.auth.username
      );
    });

    this.chatSocket.on('disconnect', () => {
      this.props.dispatch(setConnectedStatus(false));
    });

    this.chatSocket.on('users', (users) => {
      this.props.dispatch(setUserList(users));
    });

    this.chatSocket.on('joined', (user) => {
      this.props.dispatch(setUserJoined(user));
    });

    this.chatSocket.on('chat', (message) => {
      const currentDate = new Date();
      this.props.dispatch(
        setUImessage(currentDate, message.username, message.content)
      );
    });

    this.chatSocket.on('left', (userid) => {
      this.props.dispatch(setUserRemoved(userid));
    });

    this.chatSocket.connect();
  }

  componentDidMount() {
    this.initSocket();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.chatSocket.emit('msg', {
      content: this.state.value,
    });
    this.setState({ value: '' });
  }

  render() {
    const connectedStatus = this.props.chat.connectedStatus;

    if (!connectedStatus) {
      return <h4>Connecting...</h4>;
    }
    return (
      <div className="container">
        <div className="window">
          <div className="chats">{this.props.chat.messages}</div>
          <div className="new-chat">
            <input type="text" id="message" onChange={this.handleChange} />
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
