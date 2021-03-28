import {render, fireEvent} from '@testing-library/react-native';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import AlarmAction from '../src/components/AlarmAction';

test('alarm action renders correctly', () => {
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
});

test('alarm action renders no bell if user is helper', () => {
  const {getByTestId} = render(
    <AuthContext.Provider value={{clientRoles: ['helper']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  getByTestId('alarmActionBellPlaceholder');
});

test('alarm action renders bell if user is administrator', () => {
  const {getByTestId} = render(
    <AuthContext.Provider value={{clientRoles: ['administrator']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  getByTestId('alarmActionBell');
});

test('alarm action does navigate to the notifcation creation screen', async () => {
  const {getByTestId} = render(
    <AuthContext.Provider value={{clientRoles: ['administrator']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  fireEvent.press(getByTestId('alarmActionBell'));
});
