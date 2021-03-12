import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UserSelectionListScreen from '../src/screens/list/UserSelectionListScreen';

it('user selection list screen renders correctly', () => {
  renderer.create(<UserSelectionListScreen />);
});
