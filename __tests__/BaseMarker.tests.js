import {render} from '@testing-library/react-native';
import React from 'react';
import BaseMarker from '../src/components/BaseMarker';

test('the base marker renders correctly', () => {
  const coordinate = {latitude: 0, longitude: 0};
  render(<BaseMarker coordinate={coordinate} />);
});
