import React from 'react';
import Router from 'next/router';
import Form from '../styles/Form';
import { requestSignup } from '../../store/store';


class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // const req = await api.signup(this.state);
    // const data = await req.json();
    // console.log(data);
    requestSignup(this.state);
    Router.push('/');
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <hr />
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password-confirm">
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </fieldset>
      </Form>
    );
  }
}

export default Signup;
