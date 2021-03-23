import {render} from '@testing-library/react-native';
import React from 'react';
import MediaDetailScreen from '../src/screens/detail/MediaDetailScreen';

it('media detail screen renders correctly', () => {
  const route = {params: {mediaId: 1, mimeType: 'image/jpg'}};
  render(<MediaDetailScreen route={route} />);
});
