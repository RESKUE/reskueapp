import {render} from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';

it('login screen renders correctly', () => {
  render(<LoginScreen />);
});
