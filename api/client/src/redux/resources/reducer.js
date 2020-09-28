import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import unset from 'lodash/unset';
import camelCase from 'lodash/camelCase';
import { 
  FETCH_RESOURCES_BEGIN, 
  FETCH_RESOURCES_SUCCESS, 
  FETCH_RESOURCES_FAILURE, 
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILURE,
  ADD_RESOURCE_BEGIN,
  UPDATE_RESOURCE_BEGIN,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAILURE,
  DELETE_RESOURCE_BEGIN,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE
} from "./actionTypes";

const initialState = {
  data: {
    jobApplications: {},
    companies: {},
    users: {},
    events: {},
  },
  status: {
  }
}

const resources = (state = initialState, action) => {
  action.resourceType = camelCase(action.resourceType);

  switch (action.type) {
    case FETCH_RESOURCES_BEGIN:
      return merge(
        {},
        state,
        {
          status: {
            [action.resourceType]: {
              loading: true,
              error: null
            }
          }
        }
      )
    case FETCH_RESOURCES_SUCCESS:
      return merge(
        {},
        state,
        {
          data: action.payload,
          status: {
            [action.resourceType]: {
              loading: false,
              error: null
            }
          }
        }
      )
    case FETCH_RESOURCES_FAILURE:
      return merge(
        {},
        state,
        {
          status: {
            [action.resourceType]: {
              loading: false,
              error: action.error
            }
          }
        }
      )
    case ADD_RESOURCE_BEGIN:
    case UPDATE_RESOURCE_BEGIN: {
      return merge(
        {},
        state,
        {
          status: {
            [action.resourceType]: {
              pending: true,
              error: null
            }
          }
        }
      )
    }
    case ADD_RESOURCE_SUCCESS:
    case UPDATE_RESOURCE_SUCCESS: {
      return merge(
        {},
        state,
        {
          data: action.payload,
          status: {
            [action.resourceType]: {
              pending: false,
              error: null
            }
          }
        }
      )
    }
    case ADD_RESOURCE_FAILURE:
    case UPDATE_RESOURCE_FAILURE: {
      return merge(
        {},
        state,
        {
          status: {
            [action.resourceType]: {
              pending: false,
              error: action.error
            }
          }
        }
      )
    }
    case DELETE_RESOURCE_BEGIN: {
      forEach(action.payload, (objects, type) => forEach(objects, (object, id) => object.attributes.deleteStatus = 'in_progress'));

      return merge(
        {},
        state,
        {
          data: action.payload,
          status: {
            [action.resourceType]: {
              deleting: true,
              error: null
            }
          }
        }
      )
    }
    case DELETE_RESOURCE_SUCCESS: {
      let newState = merge({}, state);
      forEach(action.payload, (objects, type) => forEach(objects, (_, id) => unset(newState, `data.${type}.${id}`)));

      return merge(
        newState,
        {
          status: {
            [action.resourceType]: {
              deleting: false,
              error: null
            }
          }
        }
      )
    }
    case DELETE_RESOURCE_FAILURE: {
      forEach(action.payload, (objects, type) => forEach(objects, (object, id) => object.attributes.deleteStatus = 'error'));

      return merge(
        {},
        state,
        {
          data: action.payload,
          status: {
            [action.resourceType]: {
              deleting: false,
              error: action.error
            }
          }
        }
      )
    }
    default:
      return state;
  }
};

export default resources;