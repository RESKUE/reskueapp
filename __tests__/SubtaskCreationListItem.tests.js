import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SubtaskCreationListItem from '../src/components/listItems/SubtaskCreationListItem';

it('subtask creation list item renders correctly', () => {
  const data = {text: 'text', isRequired: true};
  renderer.create(<SubtaskCreationListItem data={data} />);
});
