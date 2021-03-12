import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskDetailScreen from '../src/screens/detail/TaskDetailScreen';

it('task detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<TaskDetailScreen route={route} />);
});
