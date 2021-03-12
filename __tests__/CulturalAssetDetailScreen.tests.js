import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetDetailScreen from '../src/screens/detail/CulturalAssetDetailScreen';

it('cultural asset detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<CulturalAssetDetailScreen route={route} />);
});
