import {render} from '@testing-library/react-native';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import React from 'react';
import UsergroupDetailScreen from '../src/screens/detail/UsergroupDetailScreen';

it('usergroup detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <UsergroupDetailScreen route={route} />
    </AuthContext.Provider>,
  );
});
