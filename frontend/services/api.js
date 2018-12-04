import fetch from 'isomorphic-unfetch';
import { endpoint, cloudinaryAPI } from '../config';

const requestHeaders = {
  'Content-Type': 'application/json'
};

// Backend API

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

export const createItem = ({ title, brand, model, gender, product, description, image, largeImage, price}, token) => {
  return fetch(`${endpoint}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      brand: brand,
      model: model,
      gender: gender,
      product: product,
      description: description,
      image: image,
      largeImage: largeImage,
      price: price
    })
  });
}

// Cloudinary API

export const uploadImage = (data) => {
  return fetch(cloudinaryAPI, {
    method: 'POST',
    body: data
  });
}
