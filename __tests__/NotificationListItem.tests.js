import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import NotificationListItem from '../src/components/listItems/NotificationListItem';

it('notification list item renders correctly', () => {
  const data = {id: 1, title: 'title', message: 'message'};
  renderer.create(<NotificationListItem data={data} />);
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
