import {render} from '@testing-library/react-native';
import React from 'react';
import PinMarker from '../src/components/PinMarker';

it('pin marker renders correctly', () => {
  const coordinate = {
    latitude: 0,
    longitude: 0,
  };
  render(<PinMarker coordinate={coordinate} />);
});
