import { combineReducers } from 'redux';
import auth from './auth/reducer';
import resources from './resources/reducer';

export default combineReducers({
  auth,
  resources
});