import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', username: '', email: '', password: '', passwordConfirmation: '', signUp: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

    handleLoginSubmit = e => {
      e.preventDefault();
      const {
        state: {
          email, password,
        },
      } = this;
      const { props: { login } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/api/sign_in`, {
        user:
          {
            email, password,
          },
      }).then(response => {
        login(response.data.data.user);
      }).catch(error => console.log(error));
    };

    handleSignup = () => {
      this.setState({
        signUp: true,
      });
    }

    handleSignupSubmit = e => {
      e.preventDefault();
      const {
        state: {
          name, username, email, password, passwordConfirmation,
        },
      } = this;
      const { props: { login } } = this;
      axios.post(`${httpProtocol}://${host}:${port}/api/sign_up`, {
        user: {
          name, username, email, password, password_confirmation: passwordConfirmation,
        },
      }).then(response => {
        login(response.data.data.user);
      });
    };

    render() {
      const {
        state: {
          name, username, email, password, passwordConfirmation, signUp,
        },
      } = this;
      const signupForm = (
        <div className="loginForm">
          <h1>Signup</h1>
          <form className="form" onSubmit={this.handleSignupSubmit}>
            <label htmlFor="name">
              <input
                placeholder="Name"
                name="name"
                className="name"
                onChange={this.handleChange}
                value={name}
              />
            </label>
            <label htmlFor="username">
              <input
                placeholder="UserName"
                name="username"
                className="username"
                onChange={this.handleChange}
                value={username}
              />
            </label>
            <label htmlFor="email">
              <input
                placeholder="Email"
                name="email"
                className="email"
                onChange={this.handleChange}
                value={email}
              />
            </label>

            <label htmlFor="password">
              <input
                placeholder="Password"
                name="password"
                className="password"
                onChange={this.handleChange}
                value={password}
              />
            </label>

            <label htmlFor="passwordConfirmation">
              <input
                placeholder="Confirm Password"
                name="passwordConfirmation"
                className="passwordConfirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
              />
            </label>

            <button
              type="submit"
              className="submit"
            >
              Signup
            </button>
          </form>
        </div>
      );
      const loginForm = (
        <div className="loginForm">
          <h1>Login</h1>
          <form className="form" onSubmit={this.handleLoginSubmit}>
            <label htmlFor="email">
              <input
                placeholder="Email"
                name="email"
                className="email"
                onChange={this.handleChange}
                value={email}
              />
            </label>

            <label htmlFor="password">
              <input
                placeholder="Password"
                name="password"
                className="password"
                onChange={this.handleChange}
                value={password}
              />
            </label>
            <button
              type="submit"
              className="submit"
            >
              Login
            </button>
          </form>
          <button type="submit" className="submit" onClick={this.handleSignup}>
            Signup
          </button>
        </div>
      );
      return signUp ? signupForm : loginForm;
    }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
