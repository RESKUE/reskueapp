import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MyTaskListItem from '../src/components/listItems/MyTaskListItem';

it('my task list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<MyTaskListItem data={data} />);
});
