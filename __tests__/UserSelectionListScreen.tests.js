import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import UserSelectionListScreen from '../src/screens/list/UserSelectionListScreen';

it('user selection list screen renders correctly', () => {
  render(
    <Provider>
      <UserSelectionListScreen />
    </Provider>,
  );
});
