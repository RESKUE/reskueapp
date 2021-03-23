import {render} from '@testing-library/react-native';
import React from 'react';
import MyTaskListScreen from '../src/screens/list/MyTaskListScreen';

it('my task list screen renders correctly', () => {
  render(<MyTaskListScreen />);
});
