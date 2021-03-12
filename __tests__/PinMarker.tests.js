import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import PinMarker from '../src/components/PinMarker';

it('pin marker renders correctly', () => {
  const coordinate = {
    latitude: 0,
    longitude: 0,
  };
  renderer.create(<PinMarker coordinate={coordinate} />);
});
