import { LOGIN_FETCH_DATA_SUCCESS, LoginActionTypes, LOGIN_SET_SELECTED_LOGIN, LOGIN_LOGIN_FAIL, LOGIN_LOGIN_SUCCESS } from '../actions/login';
import { logins, loginError, selectedLogin } from './login';
import { ILogin } from '../models/login';

test('should return logins on #LOGIN_FETCH_DATA_SUCCESS', () => {
  const testLogins: ILogin[] = [{
    id: 0,
    name: 'test'
  }]
  const result = logins([], {
    type: LOGIN_FETCH_DATA_SUCCESS,
    payload: testLogins,
  })
  expect(result).toBe(testLogins);
});

test('should return state on not #LOGIN_FETCH_DATA_SUCCESS', () => {
  const testLogins: ILogin[] = [{
    id: 0,
    name: 'test'
  }]
  const result = logins(testLogins, {
    type: LOGIN_SET_SELECTED_LOGIN,
    payload: 0,
  })
  expect(result).toBe(testLogins);
});

test('should return message on #LOGIN_LOGIN_FAIL', () => {
  const errorMessage = 'errorMessage';

  const result = loginError('', {
    type: LOGIN_LOGIN_FAIL,
    payload: errorMessage,
  })
  expect(result).toBe(errorMessage);
});

test('should return empty string on #LOGIN_LOGIN_SUCCESS', () => {
  const errorMessage = 'errorMessage';

  const result = loginError(errorMessage, {
    type: LOGIN_LOGIN_SUCCESS,
  })
  expect(result).toBe('');
});

test('should return first item id on #LOGIN_FETCH_DATA_SUCCESS', () => {
  const testLogins: ILogin[] = [{
    id: 2,
    name: 'test'
  },
  {
    id: 5,
    name: 'test1'
  }];
  const result = selectedLogin(0, {
    type: LOGIN_FETCH_DATA_SUCCESS,
    payload: testLogins
  })
  expect(result).toBe(testLogins[0].id);
});

test('should return new id on #LOGIN_SET_SELECTED_LOGIN', () => {
  const testLoginId = 7;
  const result = selectedLogin(0, {
    type: LOGIN_SET_SELECTED_LOGIN,
    payload: testLoginId
  })
  expect(result).toBe(testLoginId);
});