import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaDetailScreen from '../src/screens/detail/MediaDetailScreen';

it('media detail screen renders correctly', () => {
  const route = {params: {mediaId: 1, mimeType: 'image/jpg'}};
  renderer.create(<MediaDetailScreen route={route} />);
});
