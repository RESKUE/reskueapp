import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SubtaskUnpressableListItem from '../src/components/listItems/SubtaskUnpressableListItem';

it('subtask unpressable list item renders correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: true,
    state: 'checked',
  };
  renderer.create(<SubtaskUnpressableListItem data={data} />);
});
