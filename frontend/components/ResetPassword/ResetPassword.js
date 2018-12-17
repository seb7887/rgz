import React from 'react';
import Router from 'next/router';
import qs from 'querystringify';
import Form from '../styles/Form';
import { resetPwd } from '../../services/api';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: ''
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const qsParams = qs.parse(location.search);
    const token = qsParams.resetToken;
    const req = await resetPwd(this.state.password, this.state.passwordConfirm, token);
    const res = await req.json();
    if (res === 'success') {
      Router.push('/');
    }
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <h2>Reset your password</h2>
          <label htmlFor="password">
            New password
            <input
              type="password"
              name="password"
              placeholder="New password"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="passwordConfirm">
            Confirm new password
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm new password"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Reset Password</button>
        </fieldset>
      </Form>
    );
  }
}

export default ResetPassword;
