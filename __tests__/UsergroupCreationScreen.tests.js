import {render} from '@testing-library/react-native';
import React from 'react';
import UsergroupCreationScreen from '../src/screens/creation/UsergroupCreationScreen';

it('usergroup creation screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<UsergroupCreationScreen route={route} />);
});
