import React from 'react';
import './chatScreen.css';
import { connect } from 'react-redux';
import { setLoginStatus, loginUser } from '../actions/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  login(event) {
    console.log(
      'Username: ' + this.state.username,
      'Password: ' + this.state.password
    );
    this.props.dispatch(setLoginStatus('Logging in user...'));

    this.props.dispatch(loginUser(this.state.username, this.state.password));

    event.preventDefault();
  }

  render() {
    return (
      <div className="auth-container">
        <div className="auth-main">
        <form onSubmit={this.login}>
          <div className="form-control">
          {this.props.auth.logStatus}
          <h3>Login</h3>
          <label>
            Username:
            <input type="text" id="username" onChange={this.handleChange} />
          </label>
          </div>
          <div className="form-control">
          <label>
            Password:
            <input type="password" id="password" onChange={this.handleChange} />
          </label>
          <input className="btn" type="submit" value="Submit" />
          </div>
        </form>
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

export default connect(mapStateToProps)(Login);
