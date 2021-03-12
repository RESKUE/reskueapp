import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AssetSelectionScreen from '../src/screens/selection/AssetSelectionScreen';

it('asset selection screen renders correctly', () => {
  renderer.create(<AssetSelectionScreen />);
});
