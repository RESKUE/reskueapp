import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaDetailScreen from '../src/screens/detail/MediaDetailScreen';

it('media detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<MediaDetailScreen route={route} />);
});
