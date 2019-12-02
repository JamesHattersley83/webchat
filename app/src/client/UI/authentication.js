import React from 'react';
import Registration from './registration';
import Login from './login';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'login'
    };
    this.toggleScreen = this.toggleScreen.bind(this);
  }

  toggleScreen(event) {
    this.setState({
      screen: event.target.value
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <input type="submit" value="register" onClick={this.toggleScreen} />
        <input type="submit" value="login" onClick={this.toggleScreen} />
        {this.state.screen == 'login' ? <Login /> : <Registration />}
      </div>
    );
  }
}

export default Authentication;
