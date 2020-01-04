import React from 'react';
const SocketClient = require('socket.io-client');
import './chatScreen.css';
import { connect } from 'react-redux';
import { setUImessage } from '../actions/actions';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

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
        transports: ['websocket']
      };
    } else {
      console.log('Connecting on HTTPS');
      settings = {
        secure: true,
        reconnection: false,
        autoConnect: false,
        transports: ['websocket']
      };
    }

    let chatSocket = SocketClient('/', settings);

    chatSocket.on('connect', () => {
      console.log('connected');
    });
    chatSocket.on('test', data => {
      console.log('Data: ', data);
    });
    chatSocket.connect();
  }

  componentDidMount() {
    this.initSocket();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    const currentDate = new Date();
    this.props.dispatch(
      setUImessage(currentDate, this.props.auth.username, this.state.value)
    );
  }
  render() {
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chat: state.chat
  };
};

export default connect(mapStateToProps)(ChatScreen);
