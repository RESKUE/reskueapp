import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import UserCreationListItem from '../src/components/listItems/UserCreationListItem';

it('user creation list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  render(<UserCreationListItem data={data} />);
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
