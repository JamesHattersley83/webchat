import React from 'react';

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
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.register}>
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

export default Registration;
