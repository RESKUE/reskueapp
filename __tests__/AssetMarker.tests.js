import {render} from '@testing-library/react-native';
import React from 'react';
import AssetMarker from '../src/components/AssetMarker';

it('asset marker renders correctly', () => {
  const coordinate = {
    latitude: 0,
    longitude: 0,
  };
  render(<AssetMarker coordinate={coordinate} />);
});
