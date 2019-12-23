import React from 'react';
import './chatScreen.css';
import { connect } from 'react-redux';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
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
