import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Layout} from '../layout';

Enzyme.configure({adapter: new Adapter()});

function setup() {
  const children = <h1>layout</h1>;
  const enzymeWrapper = shallow(<Layout>{children}</Layout>);
  return {
    children,
    enzymeWrapper,
  };
}

test('should render', () => {
  const {enzymeWrapper, children} = setup();
  expect(enzymeWrapper).not.toBeNull();
});

test('should render children', () => {
  const {enzymeWrapper, children} = setup();
  expect(enzymeWrapper.find('main').children().length).toBeGreaterThan(0);
});
