import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AssetMarker from '../src/components/AssetMarker';

it('asset marker renders correctly', () => {
  const coordinate = {
    latitude: 0,
    longitude: 0,
  };
  renderer.create(<AssetMarker coordinate={coordinate} />);
});
