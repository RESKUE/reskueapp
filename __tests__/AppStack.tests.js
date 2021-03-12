import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AppStack from '../src/routing/AppStack';
import Router from '../src/routing/Router';

it('app stack render correctly', () => {
  renderer.create(
    <Router>
      <AppStack />
    </Router>,
  );
});
