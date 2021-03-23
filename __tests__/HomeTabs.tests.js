import {render} from '@testing-library/react-native';
import React from 'react';
import HomeTabs from '../src/routing/HomeTabs';
import Router from '../src/routing/Router';

it('home tabs render correctly', () => {
  render(
    <Router>
      <HomeTabs />
    </Router>,
  );
});
