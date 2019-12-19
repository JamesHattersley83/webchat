import React from 'react';
import './chatScreen.css';
import { connect } from 'react-redux';

class ChatScreen extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="window">
          <div className="chats"></div>
          <div className="new-chat">
            <input type="text" id="message" />
            <button id="send">Send</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ChatScreen);
