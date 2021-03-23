import {render} from '@testing-library/react-native';
import React from 'react';
import AuthStack from '../src/routing/AuthStack';
import Router from '../src/routing/Router';

it('auth stack render correctly', () => {
  render(
    <Router>
      <AuthStack />
    </Router>,
  );
});
