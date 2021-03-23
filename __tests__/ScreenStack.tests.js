import {render} from '@testing-library/react-native';
import React from 'react';
import ScreenStack from '../src/routing/ScreenStack';
import Router from '../src/routing/Router';

it('screen stack render correctly', () => {
  render(
    <Router>
      <ScreenStack />
    </Router>,
  );
});
