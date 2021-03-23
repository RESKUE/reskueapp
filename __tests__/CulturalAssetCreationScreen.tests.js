import {render} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetCreationScreen from '../src/screens/creation/CulturalAssetCreationScreen';

it('cultural asset creation screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<CulturalAssetCreationScreen route={route} />);
});
