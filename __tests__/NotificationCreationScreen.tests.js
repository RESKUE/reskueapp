import {render} from '@testing-library/react-native';
import React from 'react';
import NotificationCreationScreen from '../src/screens/creation/NotificationCreationScreen';

it('notification creation screen renders correctly', () => {
  const route = {params: {}};
  render(<NotificationCreationScreen route={route} />);
});
