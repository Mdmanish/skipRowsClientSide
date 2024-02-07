import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { postBooking } from '../../services/actions.js';
import './login.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      registerError: '',
    };
  }

  
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async () => {
    const { username, password, confirmPassword, email } = this.state;
    if (!username || !password || !confirmPassword || !email) {
      this.setState({ registerError: 'Please enter all fields' });
      return;
    }
    postBooking('register/', {
      username,
      password,
      confirmPassword,
      email,
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = '/login';
        this.setState({ registerError: '' });
      } else {
        this.setState({ registerError: 'Something went wrong!' });
      }
    }).catch((err) => {
      this.setState({ registerError: err.response.data.message });
    });
  };


  render() {
    const { username, password, confirmPassword, email, registerError } = this.state;
    return (
        <div className="loginContainer">
        <div className="loginForm">
          <h1>Register</h1>

          <input
            type="text"
            placeholder="username"
            value={username}
            required
            onChange={this.handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={this.handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={this.handleConfirmPasswordChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={this.handleEmailChange}
          />
          {registerError && <p className="errorMessage">{registerError}</p>}
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
          <p>
              Already have account? Click here to {' '}
              <Link to="/login" className="link">
                Login
              </Link>
            </p>
        </div>
      </div>
    )
  }
}

export default Register;
