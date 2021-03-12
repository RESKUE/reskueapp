import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import NotificationCreationScreen from '../src/screens/creation/NotificationCreationScreen';

it('notification creation screen renders correctly', () => {
  const route = {params: {}};
  renderer.create(<NotificationCreationScreen route={route} />);
});
