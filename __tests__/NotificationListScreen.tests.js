import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NotificationListScreen from '../src/screens/list/NotificationListScreen';

it('notification list screen renders correctly', () => {
  renderer.create(<NotificationListScreen />);
});
