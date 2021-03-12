import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';

it('login screen renders correctly', () => {
  renderer.create(<LoginScreen />);
});
