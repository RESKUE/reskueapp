import {render} from '@testing-library/react-native';
import React from 'react';
import LocationSelectionScreen from '../src/screens/map/LocationSelectionScreen';

it('location selection screen renders correctly', () => {
  render(<LocationSelectionScreen />);
});
