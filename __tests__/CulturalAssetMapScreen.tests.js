import {render} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetMapScreen from '../src/screens/map/CulturalAssetMapScreen';

it('cultural asset map screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<CulturalAssetMapScreen route={route} />);
});
