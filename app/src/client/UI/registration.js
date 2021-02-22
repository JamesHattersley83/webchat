import React from 'react';
import './chatScreen.css';
import { connect } from 'react-redux';
import { setRegisterStatus, registerNewUser } from '../actions/actions';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  register(event) {
    console.log(
      'Username: ' + this.state.username,
      'Password: ' + this.state.password
    );
    this.props.dispatch(setRegisterStatus('Registering user...'));

    this.props.dispatch(
      registerNewUser(this.state.username, this.state.password)
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="auth-container">
        <div className="auth-main">
        <div className="form-control">
        <form onSubmit={this.register}>
          {this.props.auth.regStatus}
          <h3>Register</h3>
          <label>
            Username:
            <input type="text" id="username" onChange={this.handleChange} />
          </label>
          </form>
          </div>
          <div className="form-control">
          <label>
            Password:
            <input type="password" id="password" onChange={this.handleChange} />
          </label>
          <input className="btn" type="submit" value="Submit" />
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

export default connect(mapStateToProps)(Registration);
