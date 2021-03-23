import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CulturalAssetSelectionListItem from '../src/components/listItems/CulturalAssetSelectionListItem';

it('cultural asset selection list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<CulturalAssetSelectionListItem data={data} />);
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
