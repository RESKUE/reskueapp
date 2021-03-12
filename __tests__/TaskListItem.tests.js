import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TaskListItem from '../src/components/listItems/TaskListItem';

it('task list item renders correctly', () => {
  const data = {id: 1, name: 'learn', description: 'hard', isEndangered: true};
  renderer.create(<TaskListItem data={data} />);
});
