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

export const signin = ({ email, password }) => {
  return fetch(`${endpoint}/signin`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
}

export const getCustomer = ({ customerId, token }) => {
  return fetch(`${endpoint}/me/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}