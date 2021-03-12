import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SpecialTaskListItem from '../src/components/listItems/SpecialTaskListItem';

it('special task list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<SpecialTaskListItem data={data} />);
});
