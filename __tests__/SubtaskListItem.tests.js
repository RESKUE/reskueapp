import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import SubtaskListItem from '../src/components/listItems/SubtaskListItem';

it('subtask list item renders correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 1,
    state: 1,
  };
  render(<SubtaskListItem data={data} />);
});

test('pressing list item works correctly', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 0,
    state: 0,
  };
  const extraData = {changeSubtaskStateCallback: jest.fn()};
  const {getByTestId} = render(
    <SubtaskListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByTestId('subtaskCheckbox'));
  expect(extraData.changeSubtaskStateCallback.mock.calls.length).toBe(1);
  expect(extraData.changeSubtaskStateCallback.mock.calls[0][0]).toBe(1);
  expect(extraData.changeSubtaskStateCallback.mock.calls[0][1]).toBe(true);
});

test('the callback is optional', () => {
  const data = {
    id: 1,
    text: 'text',
    description: 'desc',
    isRequired: 0,
    state: 0,
  };
  const {getByTestId} = render(<SubtaskListItem data={data} />);

  fireEvent.press(getByTestId('subtaskCheckbox'));
});
