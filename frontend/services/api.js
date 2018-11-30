import fetch from 'isomorphic-unfetch';
import { endpoint } from '../config';

const requestHeaders = {
  'Content-Type': 'application/json'
};

export const signup = ({ name, email, password, passwordConfirm }) => {
  return fetch(`${endpoint}/signup`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    })
  });
}