import {render} from '@testing-library/react-native';
import React from 'react';
import Router from '../src/routing/Router';
import {AuthContext, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import AuthStack from '../src/routing/AuthStack';
import AppStack from '../src/routing/AppStack';

it('router render correctly', () => {
  render(<Router />);
});

it('router renders loading indicator if auth status is null', () => {
  const {UNSAFE_getByType} = render(
    <AuthContext.Provider value={{authStatus: null}}>
      <Router />
    </AuthContext.Provider>,
  );
  UNSAFE_getByType(LoadingIndicator);
});

it('router renders auth stack if auth status is false', () => {
  const {UNSAFE_getByType} = render(
    <AuthContext.Provider value={{authStatus: false}}>
      <Router />
    </AuthContext.Provider>,
  );
  UNSAFE_getByType(AuthStack);
});

it('router renders app stack if auth status is true', () => {
  const {UNSAFE_getByType} = render(
    <AuthContext.Provider value={{authStatus: true, clientRoles: []}}>
      <Router />
    </AuthContext.Provider>,
  );
  UNSAFE_getByType(AppStack);
});
