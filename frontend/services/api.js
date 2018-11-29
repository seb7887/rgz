import fetch from 'isomorphic-unfetch';
import { endpoint } from '../config';

const requestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const signup = ({ name, email, password, passwordConfirm }) => {
  return fetch(`${endpoint}/signup`, {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    })
  });
}