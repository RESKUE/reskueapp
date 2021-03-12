import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import HeaderBar from '../src/components/baseComponents/HeaderBar';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('header bar renders correctly', () => {
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <HeaderBar />
    </AuthContext.Provider>,
  );
});
