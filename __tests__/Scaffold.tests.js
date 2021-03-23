import {render} from '@testing-library/react-native';
import React from 'react';
import Scaffold from '../src/components/baseComponents/Scaffold';

it('scaffold renders correctly', () => {
  render(<Scaffold />);
});
