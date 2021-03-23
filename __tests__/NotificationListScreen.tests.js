import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import NotificationListScreen from '../src/screens/list/NotificationListScreen';

it('notification list screen renders correctly', () => {
  render(
    <Provider>
      <NotificationListScreen />
    </Provider>,
  );
});
