import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import ScreenStack from '../src/routing/ScreenStack';
import Router from '../src/routing/Router';

it('screen stack render correctly', () => {
  renderer.create(
    <Router>
      <ScreenStack />
    </Router>,
  );
});
