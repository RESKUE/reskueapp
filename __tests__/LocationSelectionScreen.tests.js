import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import LocationSelectionScreen from '../src/screens/map/LocationSelectionScreen';

it('location selection screen renders correctly', () => {
  renderer.create(<LocationSelectionScreen />);
});
