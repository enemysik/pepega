import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render } from '@testing-library/react';
import { Login } from './login';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    fetchData: jest.fn(),
    signIn: jest.fn(),
    setSelectedLogin: jest.fn(),
    logins: [],
    selectedLogin: 0,
    loginError: '',
  }

  const enzymeWrapper = shallow(<Login {...props} />)
  return {
    props,
    enzymeWrapper
  }
}
test('should contains user label', () => {
  const { enzymeWrapper, props } = setup();
  expect(enzymeWrapper.find('label').at(0).text()).toMatch(/Пользователь/i);
});

test('should contains password label', () => {
  const { enzymeWrapper, props } = setup();
  expect(enzymeWrapper.find('label').at(1).text()).toMatch(/Пароль/i);
});

test('should call fetchData on didMount', () => {
  const { enzymeWrapper, props } = setup();
  expect(props.fetchData).toBeCalled();
});

test('should contains no error message', () => {
  const { enzymeWrapper, props } = setup();
  expect(enzymeWrapper.exists('.alert')).toBeFalsy();
});

test('should show error message on error event', () => {
  const { enzymeWrapper, props } = setup();
  const errorMessage = 'test error';
  enzymeWrapper.setProps({ loginError: errorMessage });
  expect(enzymeWrapper.exists('.alert')).toBeTruthy();
});

test('should call #login on submit', () => {
  const { enzymeWrapper, props } = setup();
  enzymeWrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  expect(props.signIn).toBeCalled();
});

test('should change state password on input change', () => {
  const { enzymeWrapper, props } = setup();
  const input = enzymeWrapper.find('input[type="password"]');
  const inputText = 'pass';
  input.simulate('change', { target: { value: inputText } });
  expect(enzymeWrapper.state('password')).toBe(inputText);
});

test('should call setLogin on select change', () => {
  const { enzymeWrapper, props } = setup();
  const select = enzymeWrapper.find('select');
  const value = 1;
  select.simulate('change', { target: { value } });
  expect(props.setSelectedLogin).toBeCalled();
  expect(props.setSelectedLogin).toBeCalledTimes(1);
  expect(props.setSelectedLogin).toBeCalledWith(value);
});

// test('should dispatch on redux', () => {
//   const { enzymeWrapper, props } = setup();
//   const select = enzymeWrapper.find('select');
//   const value = 1;
//   select.simulate('change', { target: { value } });
//   expect(props.setSelectedLogin).toBeCalled();
//   expect(props.setSelectedLogin).toBeCalledTimes(1);
//   expect(props.setSelectedLogin).toBeCalledWith(value);
// });