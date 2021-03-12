import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import HomeTabs from '../src/routing/HomeTabs';
import Router from '../src/routing/Router';

it('home tabs render correctly', () => {
  renderer.create(
    <Router>
      <HomeTabs />
    </Router>,
  );
});
