import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import MediaListItem from '../src/components/listItems/mediaListItems/MediaListItem';

test('media list item renders correctly', () => {
  const data = {altText: 'Useful image', mimeType: 'image/png'};
  render(<MediaListItem data={data} />);
});

test('media list item text is trimmed if too long', () => {
  const data = {
    altText: 'VeryVeryVeryVeryVeryVeryLongAltText',
    mimeType: 'image/png',
  };
  const {getByText} = render(<MediaListItem data={data} />);
  getByText('VeryVeryVeryVeryVeryVery...');
});

test('pressing the item triggers the navigation', () => {
  const data = {altText: 'Useful image', mimeType: 'image/png'};
  const {getByTestId} = render(
    <MediaListItem testID="mediaItem" data={data} />,
  );
  fireEvent.press(getByTestId('mediaItem'));
});
