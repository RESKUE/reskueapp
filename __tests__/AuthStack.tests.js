import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AuthStack from '../src/routing/AuthStack';
import Router from '../src/routing/Router';

it('auth stack render correctly', () => {
  renderer.create(
    <Router>
      <AuthStack />
    </Router>,
  );
});
