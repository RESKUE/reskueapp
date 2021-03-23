import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import NotificationListItem from '../src/components/listItems/NotificationListItem';

it('notification list item renders correctly', () => {
  const data = {id: 1, title: 'title', message: 'message'};
  render(<NotificationListItem data={data} />);
});

test('pressing list item works correctly', () => {
  const data = {id: 1, title: 'title', message: 'message'};
  const extraData = {
    onPress: (id) => {
      return id;
    },
  };
  const {getByText} = render(
    <NotificationListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByText(data.title));
});
