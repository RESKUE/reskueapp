import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NotificationListItem from '../src/components/listItems/NotificationListItem';

it('notification list item renders correctly', () => {
  const data = {id: 1, title: 'title', message: 'message'};
  renderer.create(<NotificationListItem data={data} />);
});
