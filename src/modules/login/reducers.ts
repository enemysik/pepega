import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {fetchDataSuccess, loginFail, loginSuccess, selectLogin} from './actions';
import {ILogin} from './types';

export const logins = createReducer<ILogin[]>([], (builder) =>
  builder
      .addCase(fetchDataSuccess, (state, action: PayloadAction<ILogin[]>) => action.payload),
);
export const loginError = createReducer<string | null>(null, (builder) =>
  builder
      .addCase(loginFail, (state, action) => (action.payload))
      .addCase(loginSuccess, () => (null)),
);
export const selectedLogin = createReducer(0, (builder) =>
  builder
      .addCase(fetchDataSuccess, (state, action) => (action.payload[0]?.id))
      .addCase(selectLogin, (state, action) => (action.payload)),
);
