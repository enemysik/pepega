import {ILogin} from './types';
import {createAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';
import {setAuthentication} from '../../core/auth/actions';

export const fetchDataSuccess = createAction<ILogin[]>('fetchDataSuccess');
export const fetchDataFail = createAction<string>('fetchDataFail');
export const loginFail = createAction<string>('loginFail');
export const loginSuccess = createAction('loginSuccess');
export const selectLogin = createAction<number>('selectLogin');

export function loginLogin(userId: number, password: string) {
  return function(dispatch: AppDispatch) {
    return fetch('/auth/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId, password,
          }),
        })
        .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(() => {
          dispatch(loginSuccess());
          dispatch(setAuthentication(true));
        })
        .catch((error) => dispatch(loginFail(error.message)));
  };
}

export function loginFetchUsers() {
  return (dispatch: AppDispatch) => {
    // dispatch(itemsIsLoading(true));
    return fetch('/login/all')
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          // dispatch(itemsIsLoading(false));
          return response;
        })
        .then((response) => response.json(),
        // , error => dispatch(loginFetchDataFail(error.message))
        )
    // .then((items) => dispatch(itemsFetchDataSuccess(items)))
        .then((logins) => dispatch(fetchDataSuccess(logins)))
        .catch((ex) => dispatch(fetchDataFail(ex.message)));
  };
}
