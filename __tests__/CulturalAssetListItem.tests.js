import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetListItem from '../src/components/listItems/CulturalAssetListItem';

test('cultural asset list item renders correctly', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  render(<CulturalAssetListItem data={data} />);
});

test('cultural asset list item renders correctly for endangered asset', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa', isEndangered: 1};
  render(<CulturalAssetListItem data={data} />);
});

test('tapping the item triggers navigation', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  const {getByTestId} = render(
    <CulturalAssetListItem testID="assetItem" data={data} />,
  );
  fireEvent.press(getByTestId('assetItem'));
});
