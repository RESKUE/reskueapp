import {render} from '@testing-library/react-native';
import React from 'react';
import AssetTags from '../src/components/AssetTags';

it('asset tags render correctly', () => {
  const data = {priority: 4, level: 0, label: 'Special', isEndagered: 1};
  render(<AssetTags data={data} />);
});
