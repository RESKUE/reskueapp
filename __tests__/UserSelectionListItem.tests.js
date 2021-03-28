import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import UserSelectionListItem from '../src/components/listItems/UserSelectionListItem';

test('user selection list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  render(<UserSelectionListItem data={data} />);
});

test('prassing triggers navigation', () => {
  const data = {id: 1, name: 'name'};
  const {getByTestId} = render(
    <UserSelectionListItem testID="userItem" data={data} />,
  );
  fireEvent.press(getByTestId('userItem'));
});
