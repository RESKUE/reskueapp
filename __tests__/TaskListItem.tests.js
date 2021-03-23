import {render} from '@testing-library/react-native';
import React from 'react';
import TaskListItem from '../src/components/listItems/TaskListItem';

it('task list item renders correctly', () => {
  const data = {id: 1, name: 'learn', description: 'hard', isEndangered: 0};
  render(<TaskListItem data={data} />);
});

it('task list item renders correctly for endangered task', () => {
  const data = {id: 1, name: 'learn', description: 'hard', isEndangered: 1};
  render(<TaskListItem data={data} />);
});
