import { ILogin } from '../models/login';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

export const LOGIN_FETCH_DATA_SUCCESS = 'LOGIN_FETCH_DATA_SUCCESS';
export const LOGIN_FETCH_DATA_FAIL = 'LOGIN_FETCH_DATA_FAIL';
export const LOGIN_LOGIN = 'LOGIN_LOGIN';
export const LOGIN_LOGIN_SUCCESS = 'LOGIN_LOGIN_SUCCESS';
export const LOGIN_LOGIN_FAIL = 'LOGIN_LOGIN_FAIL';
export const LOGIN_SET_SELECTED_LOGIN = 'LOGIN_SET_SELECTED_LOGIN';

export function loginFetchDataSuccess(logins: ILogin[]): LoginFetchDataSuccessAction {
  return {
    type: LOGIN_FETCH_DATA_SUCCESS,
    payload: logins
  };
}
export function loginFetchDataFail(message: string): LoginFetchDataFailAction {
  return {
    type: LOGIN_FETCH_DATA_FAIL,
    payload: message
  };
}
export function loginLoginSuccess(): LoginLoginSuccessAction {
  return {
    type: LOGIN_LOGIN_SUCCESS
  }
}
export function loginLoginFailed(message: string): LoginLoginFailAction {
  return {
    type: LOGIN_LOGIN_FAIL,
    payload: message
  }
}
export function loginSetSelectedLogin(userId: number): LoginSetSelectedLoginAction {
  return {
    type: LOGIN_SET_SELECTED_LOGIN,
    payload: userId
  }
}
export function loginLogin(userId: number, password: string): ThunkAction<Promise<any>, RootState, unknown, Action> {
  return function (dispatch: Dispatch) {
    return fetch('/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId, password
        })
      })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => dispatch(loginLoginSuccess()))
      .catch((error) => dispatch(loginLoginFailed(error.message)))
  }
}

export function loginFetchUsers(): ThunkAction<Promise<any>, RootState, unknown, Action<ILogin[]>> {
  return (dispatch: any) => {
    // dispatch(itemsIsLoading(true));
    return fetch('/login/all')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json()
      // , error => dispatch(loginFetchDataFail(error.message))
      )
      // .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .then((logins) => dispatch(loginFetchDataSuccess(logins)))
      .catch((ex) => dispatch(loginFetchDataFail(ex.message)));
  };
}

export interface LoginFetchDataSuccessAction {
  type: typeof LOGIN_FETCH_DATA_SUCCESS;
  payload: ILogin[];
}
export interface LoginLoginSuccessAction {
  type: typeof LOGIN_LOGIN_SUCCESS;
}
export interface LoginLoginFailAction {
  type: typeof LOGIN_LOGIN_FAIL;
  payload: string;
}
export interface LoginSetSelectedLoginAction {
  type: typeof LOGIN_SET_SELECTED_LOGIN;
  payload: number;
}
export interface LoginFetchDataFailAction {
  type: typeof LOGIN_FETCH_DATA_FAIL;
  payload: string;
}
export type LoginActionTypes = LoginFetchDataSuccessAction |
  LoginLoginSuccessAction |
  LoginLoginFailAction |
  LoginFetchDataFailAction |
  LoginSetSelectedLoginAction; 