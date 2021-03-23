import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskListItem from '../src/components/listItems/TaskListItem';

it('task list item renders correctly', () => {
  const data = {id: 1, name: 'learn', description: 'hard', isEndangered: 0};
  renderer.create(<TaskListItem data={data} />);
});

it('task list item renders correctly for endangered task', () => {
  const data = {id: 1, name: 'learn', description: 'hard', isEndangered: 1};
  renderer.create(<TaskListItem data={data} />);
});
