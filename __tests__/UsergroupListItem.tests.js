import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import UsergroupListItem from '../src/components/listItems/UsergroupListItem';

test('usergroup list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  render(<UsergroupListItem data={data} />);
});

test('pressing triggers navigation', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  const {getByTestId} = render(
    <UsergroupListItem testID="groupItem" data={data} />,
  );
  fireEvent.press(getByTestId('groupItem'));
});
