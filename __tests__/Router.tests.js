import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Router from '../src/routing/Router';
import {AuthContext, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import AuthStack from '../src/routing/AuthStack';
import AppStack from '../src/routing/AppStack';

it('router render correctly', () => {
  renderer.create(<Router />);
});

it('router renders loading indicator if auth status is null', () => {
  const output = renderer.create(
    <AuthContext.Provider value={{authStatus: null}}>
      <Router />
    </AuthContext.Provider>,
  );
  output.root.findByType(LoadingIndicator);
});

it('router renders auth stack if auth status is false', () => {
  const output = renderer.create(
    <AuthContext.Provider value={{authStatus: false}}>
      <Router />
    </AuthContext.Provider>,
  );
  output.root.findByType(AuthStack);
});

it('router renders app stack if auth status is true', () => {
  const output = renderer.create(
    <AuthContext.Provider value={{authStatus: true, clientRoles: []}}>
      <Router />
    </AuthContext.Provider>,
  );
  output.root.findByType(AppStack);
});
