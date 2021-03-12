import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskCompletionScreen from '../src/screens/detail/TaskCompletionScreen';

it('task completion screen renders correctly', () => {
  renderer.create(<TaskCompletionScreen />);
});
