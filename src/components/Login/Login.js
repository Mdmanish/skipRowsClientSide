import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postBooking } from '../../services/actions.js';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
    };
  }

  handleSubmit = async () => {
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ loginError: 'Please enter both username and password' });
      return;
    }
    postBooking('login/', {
      username,
      password,
    }).then((res) => {
      if (res.status === 200) {
        Cookies.set('username', username);
        window.location.href = '/';
        this.setState({ loginError: '' });
      } else {
        this.setState({ loginError: 'Invalid username or password' });
      }
    }).catch((err) => {
      if (err.response.status === 402) {
        this.setState({ loginError: 'This user is not registered, please click on Register' });
      }
    });
  };

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { username, password, loginError } = this.state;

    return (
        <div className="loginContainer">
          <div className="loginForm">
            <h1>Sign In</h1>

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
            {loginError && <p className="errorMessage">{loginError}</p>}
            {/* <label>
              <input type="checkbox" />
              Remember me
            </label> */}
            <button type="button" onClick={this.handleSubmit}>
              Sign In
            </button>

            <p>
              New User? Click here to {' '}
              <Link to="/register" className="link">
                Register
              </Link>
            </p>
          </div>
        </div>
    );
  }
}

export default Login;
