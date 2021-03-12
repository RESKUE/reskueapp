import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskCreationScreen from '../src/screens/creation/TaskCreationScreen';

it('tasks creation screen renders correctly', () => {
  const route = {params: {}};
  renderer.create(<TaskCreationScreen route={route} />);
});
