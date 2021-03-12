import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import CulturalAssetCreationScreen from '../src/screens/creation/CulturalAssetCreationScreen';

it('cultural asset creation screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<CulturalAssetCreationScreen route={route} />);
});
