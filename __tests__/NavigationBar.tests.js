import {render} from '@testing-library/react-native';
import React from 'react';
import NavigationBar from '../src/components/baseComponents/NavigationBar';

it('navigation bar renders correctly', () => {
  render(<NavigationBar />);
});
