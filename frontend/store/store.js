import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as api from '../services/api';
import { setCookie } from '../lib/session';

const DEFAULT_STATE = {
  isAuthenticated: false,
  customer: {}
};

const actionTypes = {
  SET_CURRENT_CUSTOMER: 'SET_CURRENT_CUSTOMER',
}

// REDUCERS
export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CUSTOMER:
      return {
        isAuthenticated: !!Object.keys(action.customer).length, // > 0
        customer: action.customer
      };
    default:
      return state;
  }
}

// ACTIONS
export const setCurrentCustomer = (customer) => {
  return {
    type: actionTypes.SET_CURRENT_CUSTOMER,
    customer
  };
}

export const requestSignup = (data) => {
  return async dispatch => {
    const response = await api.signup(data);
    console.log(response.json());

    // api not provides token
    if (!res.token) {
      return res;
    }

    // set the cookie
    setCookie('token', token);
    // set the current customer
    dispatch(setCurrentCustomer(response));
  }
}

// INIT STORE
export function initializeStore (initialState = DEFAULT_STATE) {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
}
