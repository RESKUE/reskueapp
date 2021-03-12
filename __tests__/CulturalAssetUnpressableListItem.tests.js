import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetUnpressableListItem from '../src/components/listItems/CulturalAssetUnpressableListItem';

it('cultural asset unpressable list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<CulturalAssetUnpressableListItem data={data} />);
});
