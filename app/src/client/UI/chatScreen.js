import React from 'react';
import { connect } from 'react-redux';

class ChatScreen extends React.Component {
  render() {
    return (
      <div>
        {this.props.auth.username} {this.props.auth.userid}
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
