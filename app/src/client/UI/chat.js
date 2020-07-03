import React from 'react';
import { connect } from 'react-redux';
import Authentication from './authentication';
import ChatScreen from './chatScreen';

class Chat extends React.Component {
  render() {
    return (
      <div>
        {this.props.auth.loggedIn ? <ChatScreen /> : <Authentication />}
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

export default connect(mapStateToProps)(Chat);
