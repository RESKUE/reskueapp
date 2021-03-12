import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Providers from '../src/providers';

it('providers render correctly', () => {
  renderer.create(<Providers />);
});
