import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Scaffold from '../src/components/baseComponents/Scaffold';

it('scaffold renders correctly', () => {
  renderer.create(<Scaffold />);
});
