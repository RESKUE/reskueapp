import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UsergroupListScreen from '../src/screens/list/UsergroupListScreen';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('user group list screen renders correctly', () => {
  renderer.create(
    <AuthContext.Provider value={{clientRoles: []}}>
      <UsergroupListScreen />
    </AuthContext.Provider>,
  );
});
