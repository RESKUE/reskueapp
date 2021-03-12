import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MediaListItem from '../src/components/listItems/mediaListItems/MediaListItem';

it('media list item renders correctly', () => {
  const data = {altText: 'Useful image', mimeType: 'image/png'};
  renderer.create(<MediaListItem data={data} />);
});
