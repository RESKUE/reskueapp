import {render} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetDetailScreen from '../src/screens/detail/CulturalAssetDetailScreen';

it('cultural asset detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<CulturalAssetDetailScreen route={route} />);
});
