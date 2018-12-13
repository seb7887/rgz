import fetch from 'isomorphic-unfetch';
import { endpoint, cloudinaryAPI } from '../config';

const requestHeaders = {
  'Content-Type': 'application/json'
};

// Backend API

/**
 * Customers
 */
export const me = (token) => {
  return fetch(`${endpoint}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

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

export const getCustomers = (token) => {
  return fetch(`${endpoint}/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

export const updatePermissions = (permissions, id, token) => {
  return fetch(`${endpoint}/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      permissions: permissions
    })
  });
}

/**
 * Items
 */
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

export const getItems = () => {
  return fetch(`${endpoint}/items`, {
    method: 'GET',
    headers: requestHeaders
  });
}

export const getTotalOfItems = () => {
  return fetch(`${endpoint}/items/total`, {
    method: 'GET',
    headers: requestHeaders
  });
}

export const getPage = (page) => {
  return fetch(`${endpoint}/items/${page}`, {
    method: 'GET',
    headers: requestHeaders
  });
}

export const getItem = (id, token) => {
  return fetch(`${endpoint}/item/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const updateItem = (id, token, { title, brand, model, gender, product, description, price}) => {
  return fetch(`${endpoint}/item/${id}`, {
    method: 'PUT',
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
      price: price
    })
  });
}

export const deleteItem = (id, token) => {
  return fetch(`${endpoint}/item/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

export const searchItems = (query) => {
  return fetch(`${endpoint}/search?q=${query}`, {
    method: 'GET',
    headers: requestHeaders
  });
}

/**
 * Cart
 */
export const getCartItems = (id, token) => {
  return fetch(`${endpoint}/cart/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

export const addCartItem = (c_id, i_id, token) => {
  return fetch(`${endpoint}/cart/${c_id}/${i_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

export const removeCartItem = (c_id, i_id, token) => {
  return fetch(`${endpoint}/cart/${c_id}/${i_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

/**
 * Orders
 */
export const getOrders = (c_id, token) => {
  return fetch(`${endpoint}/orders/${c_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

// Cloudinary API

export const uploadImage = (data) => {
  return fetch(cloudinaryAPI, {
    method: 'POST',
    body: data
  });
}
