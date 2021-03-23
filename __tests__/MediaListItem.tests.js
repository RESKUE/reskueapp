import {render} from '@testing-library/react-native';
import React from 'react';
import MediaListItem from '../src/components/listItems/mediaListItems/MediaListItem';

it('media list item renders correctly', () => {
  const data = {altText: 'Useful image', mimeType: 'image/png'};
  render(<MediaListItem data={data} />);
});
