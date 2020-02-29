import { ILogin } from '../../models/login';
import { PayloadAction, createAction, createReducer } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../store/configureStore';
import { setAuthentication } from '../auth/actions';

export const fetchDataSuccess = createAction<ILogin[]>('fetchDataSuccess')
export const fetchDataFail = createAction<string>('fetchDataFail')
export const loginFail = createAction<string>('loginFail')
export const loginSuccess = createAction('loginSuccess')
export const selectLogin = createAction<number>('selectLogin')

export const logins = createReducer<ILogin[]>([], builder =>
  builder
    .addCase(fetchDataSuccess, (state, action: PayloadAction<ILogin[]>) => action.payload)
);
export const loginError = createReducer<string | null>(null, builder =>
  builder
    .addCase(loginFail, (state, action) => (action.payload))
    .addCase(loginSuccess, () => (null))
);
export const selectedLogin = createReducer(0, builder =>
  builder
    .addCase(fetchDataSuccess, (state, action) => (action.payload[0]?.id))
    .addCase(selectLogin, (state, action) => (action.payload))
);

export function loginLogin(userId: number, password: string) {
  return function (dispatch: AppDispatch) {
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
      .then(() => {
        dispatch(loginSuccess());
        dispatch(setAuthentication(true));
      })
      .catch((error) => dispatch(loginFail(error.message)))
  }
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
      .then((response) => response.json()
        // , error => dispatch(loginFetchDataFail(error.message))
      )
      // .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .then((logins) => dispatch(fetchDataSuccess(logins)))
      .catch((ex) => dispatch(fetchDataFail(ex.message)));
  };
}