import {render} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetListItem from '../src/components/listItems/CulturalAssetListItem';

it('cultural asset list item renders correctly', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  render(<CulturalAssetListItem data={data} />);
});

it('cultural asset list item renders correctly for endangered asset', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa', isEndangered: 1};
  render(<CulturalAssetListItem data={data} />);
});
