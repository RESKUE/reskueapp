import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import GroupSelectionScreen from '../src/screens/selection/GroupSelectionScreen';

it('group selection screen renders correctly', () => {
  renderer.create(<GroupSelectionScreen />);
});
