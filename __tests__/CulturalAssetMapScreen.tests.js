import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetMapScreen from '../src/screens/map/CulturalAssetMapScreen';

it('cultural asset map screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<CulturalAssetMapScreen route={route} />);
});
