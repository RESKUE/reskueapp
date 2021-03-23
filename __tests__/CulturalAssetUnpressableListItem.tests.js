import {render} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetUnpressableListItem from '../src/components/listItems/CulturalAssetUnpressableListItem';

it('cultural asset unpressable list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  render(<CulturalAssetUnpressableListItem data={data} />);
});
