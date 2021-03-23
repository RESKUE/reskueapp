import {render} from '@testing-library/react-native';
import React from 'react';
import AppStack from '../src/routing/AppStack';
import Router from '../src/routing/Router';

it('app stack render correctly', () => {
  render(
    <Router>
      <AppStack />
    </Router>,
  );
});
