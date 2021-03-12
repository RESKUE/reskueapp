import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetListItem from '../src/components/listItems/CulturalAssetListItem';

it('cultural asset list item renders correctly', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  renderer.create(<CulturalAssetListItem data={data} />);
});
