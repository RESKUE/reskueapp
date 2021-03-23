import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CulturalAssetCreationListItem from '../src/components/listItems/CulturalAssetCreationListItem';

it('cultural asset creation list item renders correctly', () => {
  const data = {id: 1, name: 'mona', desc: 'lisa'};
  renderer.create(<CulturalAssetCreationListItem data={data} />);
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
