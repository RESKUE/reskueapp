import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SpecialCulturalAssetListItem from '../src/components/listItems/SpecialCulturalAssetListItem';

it('special cultural asset list item renders correctly', () => {
  const data = {id: 1};
  renderer.create(<SpecialCulturalAssetListItem data={data} />);
});
