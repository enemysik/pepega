import React from 'react';
import configureMockStore from 'redux-mock-store'
import Enzyme, { shallow } from 'enzyme'
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Adapter from 'enzyme-adapter-react-16'
import * as actions from './login';
import { ILogin } from '../models/login';
import { RootState } from '../reducers';
import fetchMock from 'fetch-mock';

test('should return actual data', () => {
  const testLogins: ILogin[] = [{
    id: 1,
    name: 'test'
  }]
  const result = actions.loginFetchDataSuccess(testLogins);
  expect(result.type).toBe(actions.LOGIN_FETCH_DATA_SUCCESS);
  expect(result.payload).toBe(testLogins);
});

test('should return actual data', () => {
  const result = actions.loginLoginSuccess();
  expect(result.type).toBe(actions.LOGIN_LOGIN_SUCCESS);
});

test('should return actual data', () => {
  const errorMessage = 'errorMessage';
  const result = actions.loginLoginFailed(errorMessage);
  expect(result.type).toBe(actions.LOGIN_LOGIN_FAIL);
  expect(result.payload).toBe(errorMessage);
});

test('should return actual data', () => {
  const testLoginId = 65;
  const result = actions.loginSetSelectedLogin(testLoginId);
  expect(result.type).toBe(actions.LOGIN_SET_SELECTED_LOGIN);
  expect(result.payload).toBe(testLoginId);
});

describe('async test', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test('should return actual data', () => {
    const middleWares = [thunk]
    const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, void, AnyAction>>(middleWares)
    const testLogins: ILogin[] = [{
      id: 1,
      name: 'test'
    }];
    fetchMock.getOnce('/login/all', {
      body: testLogins
    });
    const errorMessage = 'errorMessage';
    const expectedActionsSuccess: actions.LoginActionTypes[] = [
      { type: actions.LOGIN_FETCH_DATA_SUCCESS, payload: testLogins },
      { type: actions.LOGIN_FETCH_DATA_FAIL, payload: errorMessage },
    ];
    const store = mockStore({ logins: [], loginError: '', selectedLogin: 0 })

    store.dispatch(actions.loginFetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActionsSuccess);
    }).catch(error => {
      fail(error);
    });
  });

  test('should return actual data', () => {
    const middleWares = [thunk]
    const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, void, AnyAction>>(middleWares)
    const testLogins: ILogin[] = [{
      id: 1,
      name: 'test'
    }];
    const testLogin = {
      userId: 7,
      password: 'pass'
    };
    fetchMock.post('/auth/login', {
    });
    const errorMessage = 'errorMessage';
    const expectedActions = [
      { type: actions.LOGIN_LOGIN_FAIL, payload: errorMessage },
      { type: actions.LOGIN_LOGIN_SUCCESS },
    ];
    const store = mockStore({ logins: [], loginError: '', selectedLogin: 0 })

    store.dispatch(actions.loginLogin(testLogin.userId, testLogin.password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(ex => fail(ex))
  });
})
