import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserCreationListItem from '../src/components/listItems/UserCreationListItem';

it('user creation list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  renderer.create(<UserCreationListItem data={data} />);
});

test('pressing remove iconbutton of list item works correctly', () => {
  const data = {id: 1, name: 'name'};
  const extraData = {
    removeCallback: (id) => {
      return id;
    },
  };
  const {getByTestId} = render(
    <UserCreationListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByTestId('removeUserIconButton'));
});
