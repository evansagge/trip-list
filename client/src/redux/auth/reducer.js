import {
  SIGNIN_USER,
  SIGNIN_USER_ERROR,
  SIGNOUT_USER
} from './actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case SIGNIN_USER:
      return { ...state, isAuthenticated: true, user: action.payload, error: null }
    case SIGNIN_USER_ERROR:
      return { ...state, isAuthenticated: false, user: null, error: action.error  }
    case SIGNOUT_USER:
      return { ...state, isAuthenticated: false, user: null, error: null }
    default:
      return state
  }
}

export default auth;