import axios from 'axios';
import startsWith from 'lodash/startsWith';

import {
  SIGNIN_USER,
  SIGNIN_USER_ERROR,
  SIGNOUT_USER
} from './actionTypes';

function handleErrors(response) {
  if (!startsWith(response.status, '2')) {
    throw Error(response.statusText);
  }
  return response;
}

export const userSignUp = (user) => {
  return async dispatch => {
    return axios.post(`/users/sign_up`, { user: user })
      .then(handleErrors)
      .then(res => {
        localStorage.setItem("access-token", res.headers['access-token']);
        localStorage.setItem("refresh-token", res.headers['refresh-token']);
        localStorage.setItem("expire-at", res.headers['expire-at']);

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.headers['access-token']}`;

        dispatch({ type: SIGNIN_USER, payload: res.data })
      })
      .catch(error => dispatch({ type: SIGNIN_USER_ERROR, error: error }));
  };
}

export const userSignIn = (user) => {
  return async dispatch => {
    return axios.post(`/users/sign_in`, { user: user })
      .then(handleErrors)
      .then(res => {
        localStorage.setItem("access-token", res.headers['access-token']);
        localStorage.setItem("refresh-token", res.headers['refresh-token']);
        localStorage.setItem("expire-at", res.headers['expire-at']);

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.headers['access-token']}`;

        dispatch({ type: SIGNIN_USER, payload: res.data })
      })
      .catch(error => dispatch({ type: SIGNIN_USER_ERROR, error: error }));
  };
}

export const userSignInFromToken = (accessToken) => {
  return async dispatch => {
    return axios.get(`/users`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then(handleErrors)
      .then(res => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        dispatch({ type: SIGNIN_USER, payload: res.data })
      })
      .catch(error => dispatch({ type: SIGNIN_USER_ERROR, error: error }));
  };
}

export const userSignOut = (user) => {
  const accessToken = localStorage.getItem('access-token');

  return async dispatch => {
    return axios.delete(`/users/sign_out`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then(handleErrors)
      .then(res => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("expire-at");
        dispatch({ type: SIGNOUT_USER })
      })
      .catch(error => dispatch({ type: SIGNIN_USER_ERROR, error: error }));
  };
}