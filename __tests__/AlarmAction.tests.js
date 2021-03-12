import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AlarmAction from '../src/components/AlarmAction';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import {Appbar} from 'react-native-paper';

it('alarm action renders correctly', () => {
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
});

it('alarm action renders no bell if user is helper', () => {
  const output = renderer.create(
    <AuthContext.Provider value={{clientRoles: ['helper']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  const action = output.root.findByType(Appbar.Action);
  expect(action.props.icon).toBe(undefined);
});

it('alarm action renders bell if user is administrator', () => {
  const output = renderer.create(
    <AuthContext.Provider value={{clientRoles: ['administrator']}}>
      <AlarmAction />
    </AuthContext.Provider>,
  );
  output.root.findByProps({icon: 'bell'});
});
