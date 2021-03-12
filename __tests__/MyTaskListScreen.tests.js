import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MyTaskListScreen from '../src/screens/list/MyTaskListScreen';

it('my task list screen renders correctly', () => {
  renderer.create(<MyTaskListScreen />);
});
