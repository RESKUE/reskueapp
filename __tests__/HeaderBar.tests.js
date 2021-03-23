import {render} from '@testing-library/react-native';
import React from 'react';
import HeaderBar from '../src/components/baseComponents/HeaderBar';
import {AuthContext} from '@ilt-pse/react-native-kueres';

it('header bar renders correctly', () => {
  render(
    <AuthContext.Provider value={{clientRoles: []}}>
      <HeaderBar />
    </AuthContext.Provider>,
  );
});
