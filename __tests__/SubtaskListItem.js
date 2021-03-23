import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SubtaskListItem from '../src/components/listItems/SubtaskListItem';

it('subtask list item renders correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 1,
    state: 1,
  };
  renderer.create(<SubtaskListItem data={data} />);
});

test('pressing list item works correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 0,
    state: 0,
  };
  const extraData = {
    changeSubtaskStateCallback: (id, state) => {
      return id && state;
    },
  };
  const {getByTestId} = render(
    <SubtaskListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByTestId('subtaskCheckbox'));
});
