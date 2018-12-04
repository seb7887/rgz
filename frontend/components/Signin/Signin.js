import React from 'react';
import Router from 'next/router';
import Form from '../styles/Form';
import { signin, getCustomer } from '../../services/api';
import { setCookie } from '../../lib/session';

class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const req = await signin(this.state);
    const data = await req.json();
    console.log(data);
    if (data && data.success) {
      setCookie('token', data.token);
      const customer = await getCustomer(data);
      const me = await customer.json();
      console.log(me);
      this.props.loadCustomer(me);
    }
    Router.push('/');
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <h2>Sign In</h2>
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
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    );
  }
}

export default Signin;
