import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import CulturalAssetCreationListItem from '../src/components/listItems/CulturalAssetCreationListItem';

it('cultural asset creation list item renders correctly', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  render(<CulturalAssetCreationListItem data={data} />);
});

test('pressing right iconbutton works correctly', () => {
  const data = {id: 1, name: 'mona', description: 'lisa'};
  const extraData = {
    removeCallback: () => {
      return true;
    },
  };
  const {getByTestId} = render(
    <CulturalAssetCreationListItem data={data} extraData={extraData} />,
  );
  fireEvent.press(getByTestId('removeAssetIconButton'));
});
