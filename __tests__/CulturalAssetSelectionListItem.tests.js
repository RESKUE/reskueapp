import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetSelectionListItem from '../src/components/listItems/CulturalAssetSelectionListItem';

it('cultural asset selection list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<CulturalAssetSelectionListItem data={data} />);
});
