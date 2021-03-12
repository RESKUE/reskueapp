import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MapContainer from '../src/components/MapContainer';

it('map container renders correctly', () => {
  renderer.create(<MapContainer />);
});
