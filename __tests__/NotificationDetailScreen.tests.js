import {render} from '@testing-library/react-native';
import React from 'react';
import NotificationDetailScreen from '../src/screens/detail/NotificationDetailScreen';

it('notification detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<NotificationDetailScreen route={route} />);
});
