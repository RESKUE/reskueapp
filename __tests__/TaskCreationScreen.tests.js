import {render} from '@testing-library/react-native';
import React from 'react';
import TaskCreationScreen from '../src/screens/creation/TaskCreationScreen';

it('tasks creation screen renders correctly', () => {
  const route = {params: {}};
  render(<TaskCreationScreen route={route} />);
});
