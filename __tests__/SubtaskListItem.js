import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SubtaskListItem from '../src/components/listItems/SubtaskListItem';

it('subtask list item renders correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: true,
    state: 'checked',
  };
  renderer.create(<SubtaskListItem data={data} />);
});
