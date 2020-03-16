import React from 'react';
import configureMockStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import {fetchDataSuccess, loginSuccess, loginFail, selectLogin, fetchDataFail, loginFetchUsers, loginLogin, logins, loginError, selectedLogin} from '../actions';
import {ILogin} from '../login';
import {RootState} from '../../..';
import fetchMock from 'fetch-mock';

test('should return actual data', () => {
  const testLogins: ILogin[] = [{
    id: 1,
    name: 'test',
  }];
  const result = fetchDataSuccess(testLogins);
  expect(result).toBe({
    payload: testLogins,
    type: fetchDataSuccess.type,
  });
});

test('should return actual data', () => {
  const result = loginSuccess();
  expect(result).toBe({
    type: loginSuccess,
  });
});

test('should return actual data', () => {
  const errorMessage = 'errorMessage';
  const result = loginFail(errorMessage);
  expect(result).toBe({
    type: loginFail.type,
    payload: errorMessage,
  });
});

test('should return actual data', () => {
  const testLoginId = 65;
  const result = selectLogin(testLoginId);
  expect(result).toBe({
    type: selectLogin.type,
    payload: testLoginId,
  });
});

describe('async test', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test('should return actual data', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, void, AnyAction>>(middleWares);
    const testLogins: ILogin[] = [{
      id: 1,
      name: 'test',
    }];
    fetchMock.getOnce('/login/all', {
      body: testLogins,
    });
    const errorMessage = 'errorMessage';
    const expectedActionsSuccess = [
      {type: fetchDataSuccess.type, payload: testLogins},
      {type: fetchDataFail.type, payload: errorMessage},
    ];
    const store = mockStore({logins: [], loginError: '', selectedLogin: 0});

    store.dispatch(loginFetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActionsSuccess);
    }).catch((error) => {
      fail(error);
    });
  });
  // ThunkAction<Promise<any>, RootState, unknown, Action<ILogin[]>>
  test('should return actual data', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore<RootState, ThunkDispatch<RootState, void, AnyAction>>(middleWares);
    const testLogins: ILogin[] = [{
      id: 1,
      name: 'test',
    }];
    const testLogin = {
      userId: 7,
      password: 'pass',
    };
    fetchMock.post('/auth/login', {
    });
    const errorMessage = 'errorMessage';
    const expectedActions = [
      // { type: loginFail.type, payload: errorMessage },
      {type: loginSuccess.type, payload: undefined},
    ];
    const store = mockStore({logins: [], loginError: '', selectedLogin: 0});

    store.dispatch(loginLogin(testLogin.userId, testLogin.password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch((ex) => fail(ex));
  });
});


test('should return logins on #LOGIN_FETCH_DATA_SUCCESS', () => {
  const testLogins: ILogin[] = [{
    id: 0,
    name: 'test',
  }];
  const result = logins([], {
    type: fetchDataSuccess.type,
    payload: testLogins,
  });
  expect(result).toBe(testLogins);
});

// test('should return state on not #LOGIN_FETCH_DATA_SUCCESS', () => {
//   const testLogins: ILogin[] = [{
//     id: 0,
//     name: 'test'
//   }]
//   const result = logins(testLogins, {
//     type: LOGIN_SET_SELECTED_LOGIN,
//     payload: 0,
//   })
//   expect(result).toBe(testLogins);
// });

test('should return message on #LOGIN_LOGIN_FAIL', () => {
  const errorMessage = 'errorMessage';

  const result = loginError(null, {
    type: loginFail.type,
    payload: errorMessage,
  });
  expect(result).toBe(errorMessage);
});

test('should return empty string on #LOGIN_LOGIN_SUCCESS', () => {
  const errorMessage = 'errorMessage';

  const result = loginError(errorMessage, {
    type: loginSuccess.type,
  });
  expect(result).toBe(null);
});

test('should return first item id on #LOGIN_FETCH_DATA_SUCCESS', () => {
  const testLogins: ILogin[] = [{
    id: 2,
    name: 'test',
  },
  {
    id: 5,
    name: 'test1',
  }];
  const result = selectedLogin(0, {
    type: fetchDataSuccess.type,
    payload: testLogins,
  });
  expect(result).toBe(testLogins[0].id);
});

test('should return new id on #LOGIN_SET_SELECTED_LOGIN', () => {
  const testLoginId = 7;
  const result = selectedLogin(0, {
    type: selectLogin.type,
    payload: testLoginId,
  });
  expect(result).toBe(testLoginId);
});
