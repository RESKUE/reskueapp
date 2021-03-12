import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NotificationDetailScreen from '../src/screens/detail/NotificationDetailScreen';

it('notification detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<NotificationDetailScreen route={route} />);
});
