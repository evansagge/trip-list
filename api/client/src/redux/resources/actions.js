import axios from 'axios';
import normalize from 'json-api-normalizer';
import snakeCase from 'lodash/snakeCase';
import startsWith from 'lodash/startsWith';
import snakeCaseKeys from 'snakecase-keys';

import { 
  FETCH_RESOURCES_BEGIN, 
  FETCH_RESOURCES_SUCCESS, 
  FETCH_RESOURCES_FAILURE, 
  ADD_RESOURCE_BEGIN,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILURE,
  UPDATE_RESOURCE_BEGIN,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAILURE,
  DELETE_RESOURCE_BEGIN,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
} from "./actionTypes";

function handleErrors(response) {
  if (!startsWith(response.status, '2')) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchResources = (resourceType) => {
  const action = { resourceType: resourceType };

  return dispatch => {
    dispatch({ ...action, type: FETCH_RESOURCES_BEGIN });

    return axios.get(`/v1/${resourceType}`)
      .then(handleErrors)
      .then(res => dispatch({ ...action, type: FETCH_RESOURCES_SUCCESS, payload: normalize(res.data) }))
      .catch(error => dispatch({ ...action, type: FETCH_RESOURCES_FAILURE, error: error }));
  };
}

export const fetchResource = (resourceType, resourceId) => {
  const action = { resourceType: resourceType };

  return dispatch => {
    dispatch({ ...action, type: FETCH_RESOURCES_BEGIN });

    return axios.get(`/v1/${resourceType}/${resourceId}`)
      .then(handleErrors)
      .then(res => dispatch({ ...action, type: FETCH_RESOURCES_SUCCESS, payload: normalize(res.data) }))
      .catch(error => dispatch({ ...action, type: FETCH_RESOURCES_FAILURE, error: error }));
  };
}

export const addResource = (resource) => {
  const resourceType = snakeCase(resource.data.type);
  const action = { resourceType: resourceType };

  return async dispatch => {
    dispatch({ ...action, type: ADD_RESOURCE_BEGIN });

    return axios.post(`/v1/${resourceType}`, snakeCaseKeys(resource))
      .then(handleErrors)
      .then(res => dispatch({ ...action, type: ADD_RESOURCE_SUCCESS, payload: normalize(res.data) }))
      .catch(error => dispatch({ ...action, type: ADD_RESOURCE_FAILURE, error: error }));
  };
}

export const updateResource = (resource) => {
  const resourceType = snakeCase(resource.data.type);
  const resourceId = resource.data.id;
  const action = { resourceType: resourceType };

  return async dispatch => {
    dispatch({ ...action, type: UPDATE_RESOURCE_BEGIN });

    return axios.patch(`/v1/${resourceType}/${resourceId}`, snakeCaseKeys(resource))
      .then(handleErrors)
      .then(res => dispatch({ ...action, type: UPDATE_RESOURCE_SUCCESS, payload: normalize(res.data) }))
      .catch(error => dispatch({ ...action, type: UPDATE_RESOURCE_FAILURE, error: error }));
  };
}

export const deleteResource = (resource) => {
  const resourceType = snakeCase(resource.data.type);
  const resourceId = resource.data.id;
  const action = { resourceType: resourceType, payload: normalize(resource) };

  return async dispatch => {
    dispatch({ ...action, type: DELETE_RESOURCE_BEGIN });

    return axios.delete(`/v1/${resourceType}/${resourceId}`)
      .then(handleErrors)
      .then(res => dispatch({ ...action, type: DELETE_RESOURCE_SUCCESS }))
      .catch(error => dispatch({ ...action, type: DELETE_RESOURCE_FAILURE, error: error }));
  }
}