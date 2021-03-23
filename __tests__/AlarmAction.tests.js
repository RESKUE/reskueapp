import {render} from '@testing-library/react-native';
import React from 'react';
import AlarmAction from '../src/components/AlarmAction';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import {Appbar} from 'react-native-paper';

it('alarm action renders correctly', () => {
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
});

it('alarm action renders no bell if user is helper', () => {
  const {UNSAFE_getByType} = render(
    <AuthContext.Provider value={{clientRoles: ['helper']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  const action = UNSAFE_getByType(Appbar.Action);
  expect(action.props.icon).toBe(undefined);
});

it('alarm action renders bell if user is administrator', () => {
  const {UNSAFE_getByProps} = render(
    <AuthContext.Provider value={{clientRoles: ['administrator']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  UNSAFE_getByProps({icon: 'bell'});
});
