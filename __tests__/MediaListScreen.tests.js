import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaListScreen from '../src/screens/list/MediaListScreen';

it('media list screen renders correctly', () => {
  renderer.create(<MediaListScreen />);
});
