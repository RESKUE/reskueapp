import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetSelectionListScreen from '../src/screens/list/CulturalAssetSelectionListScreen';

it('cultural asset selection list screen renders correctly', () => {
  const route = {params: {selectionType: 'parent'}};
  renderer.create(<CulturalAssetSelectionListScreen route={route} />);
});
