import {render} from '@testing-library/react-native';
import React from 'react';
import TaskCompletionScreen from '../src/screens/detail/TaskCompletionScreen';

it('task completion screen renders correctly', () => {
  render(<TaskCompletionScreen />);
});
