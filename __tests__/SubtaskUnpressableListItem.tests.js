import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SubtaskUnpressableListItem from '../src/components/listItems/SubtaskUnpressableListItem';

it('subtask unpressable list item renders correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 1,
    state: 1,
  };
  renderer.create(<SubtaskUnpressableListItem data={data} />);
});

it('subtask unpressable list item renders correctly with different data', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 0,
    state: 0,
  };
  renderer.create(<SubtaskUnpressableListItem data={data} />);
});
