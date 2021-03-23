import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetSelectionListItem from '../src/components/listItems/CulturalAssetSelectionListItem';

it('cultural asset selection list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  render(<CulturalAssetSelectionListItem data={data} />);
});

test('pressing list item works correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  const extraData = {
    callback: (id) => {
      return id;
    },
  };
  const {getByText} = render(
    <CulturalAssetSelectionListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByText(data.name));
});
