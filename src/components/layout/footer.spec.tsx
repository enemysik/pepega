import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render } from '@testing-library/react';
import { Footer } from './footer';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const enzymeWrapper = shallow(<Footer />)
  return {
    enzymeWrapper
  }
}

test('should render', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper).not.toBeNull();
});

test('should contains nickname', () => {
  const { enzymeWrapper } = setup();
  expect(enzymeWrapper.find('footer').text()).toMatch(/EnemySik/i);
});
