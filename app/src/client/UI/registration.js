import React from 'react';
import { connect } from 'react-redux';
import { setRegisterStatus } from '../actions/actions';

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
    this.setState({ [event.target.name]: event.target.value });
  }

  register(event) {
    console.log(
      'Username: ' + this.state.username,
      'Password: ' + this.state.password
    );

    this.props.dispatch(setRegisterStatus('Registering...'));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.register}>
        <div>{this.props.auth.regStatus}</div>
        <label>
          Username:
          <input type="text" name="username" onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Registration);
