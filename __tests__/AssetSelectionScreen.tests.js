import {render} from '@testing-library/react-native';
import React from 'react';
import AssetSelectionScreen from '../src/screens/selection/AssetSelectionScreen';

it('asset selection screen renders correctly', () => {
  render(<AssetSelectionScreen />);
});
