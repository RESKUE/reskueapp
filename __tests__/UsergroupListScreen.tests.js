import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import UsergroupListScreen from '../src/screens/list/UsergroupListScreen';

it('user group list screen renders correctly', () => {
  render(
    <Provider>
      <AuthContext.Provider value={{clientRoles: []}}>
        <UsergroupListScreen />
      </AuthContext.Provider>
    </Provider>,
  );
});
