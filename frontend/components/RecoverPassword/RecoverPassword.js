import React from 'react';
import Router from 'next/router';
import Form from '../styles/Form';
import { requestPwdRecover } from '../../services/api';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const req = await requestPwdRecover(this.state.email);
    const message = await req.json();
    if (message === 'Thanks!') {
      Router.push('/');
    }
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <h2>Request new password</h2>
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
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    )
  }
}

export default RecoverPassword;
