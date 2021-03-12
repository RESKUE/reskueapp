import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaScreen from '../src/screens/media/MediaScreen';

it('media screen renders correctly', () => {
  renderer.create(<MediaScreen />);
});