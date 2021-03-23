import {render} from '@testing-library/react-native';
import React from 'react';
import SpecialCulturalAssetListItem from '../src/components/listItems/SpecialCulturalAssetListItem';

it('special cultural asset list item renders correctly', () => {
  const data = {id: 1};
  render(<SpecialCulturalAssetListItem data={data} />);
});
