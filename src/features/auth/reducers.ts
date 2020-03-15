import {createReducer, combineReducers} from '@reduxjs/toolkit';
import {setAuthentication} from './actions';

const isAuthenticatedReducer = createReducer(false, (builder) =>
  builder
      .addCase(setAuthentication, (state, action) => action.payload));

export default combineReducers({
  isAuthenticated: isAuthenticatedReducer,
});
