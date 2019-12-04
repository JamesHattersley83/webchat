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

  toggleScreen(name) {
    this.setState({
      screen: `${name}`
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleScreen('register')}>Register</button>
        <button onClick={() => this.toggleScreen('login')}>Login</button>
        {this.state.screen == 'login' ? <Login /> : <Registration />}
      </div>
    );
  }
}

export default Authentication;
