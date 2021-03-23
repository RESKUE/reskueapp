import {render} from '@testing-library/react-native';
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
  render(<SubtaskUnpressableListItem data={data} />);
});

it('subtask unpressable list item renders correctly with different data', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 0,
    state: 0,
  };
  render(<SubtaskUnpressableListItem data={data} />);
});
