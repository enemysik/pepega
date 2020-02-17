import { LOGIN_FETCH_DATA_SUCCESS, LoginActionTypes, LOGIN_SET_SELECTED_LOGIN, LOGIN_LOGIN_FAIL, LOGIN_LOGIN_SUCCESS } from '../actions/login';
import { ILogin } from '../models/login';

export function logins(state: ILogin[] = [], action: LoginActionTypes) {
  switch (action.type) {
    case LOGIN_FETCH_DATA_SUCCESS: return action.payload;
    default: return state;
  }
}
export function loginError(state: string = '', action: LoginActionTypes) {
  switch (action.type) {
    case LOGIN_LOGIN_FAIL: return action.payload;
    case LOGIN_LOGIN_SUCCESS: return '';
    default: return state;
  }
}
export function selectedLogin(state: number = 0, action: LoginActionTypes) {
  switch (action.type) {
    case LOGIN_FETCH_DATA_SUCCESS: return action.payload[0]?.id;
    case LOGIN_SET_SELECTED_LOGIN: return action.payload;
    default: return state;
  }
}
