import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SubtaskCreationListItem from '../src/components/listItems/SubtaskCreationListItem';

it('subtask creation list item renders correctly', () => {
  const data = {
    localId: 1,
    text: 'text',
    description: 'desc',
    isRequired: 1,
  };
  renderer.create(<SubtaskCreationListItem data={data} />);
});

test('pressing checkbox of list item works correctly', () => {
  const data = {
    localId: 1,
    text: '',
    description: 'desc',
    isRequired: 0,
  };
  const extraData = {
    changeIsRequiredCallback: (localId, isRequired) => {
      return localId && isRequired;
    },
  };
  const {getByTestId} = render(
    <SubtaskCreationListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByTestId('subtaskCheckbox'));
});

test('changing text of list item works correctly', () => {
  const data = {
    localId: 1,
    text: 'some text',
    description: 'desc',
    isRequired: 0,
  };
  const extraData = {
    changeTextCallback: (localId, text) => {
      return localId && text;
    },
  };
  const {getByDisplayValue} = render(
    <SubtaskCreationListItem data={data} extraData={extraData} />,
  );

  fireEvent.changeText(getByDisplayValue('some text'), 'some different text');
});

test('pressing iconbutton of list item works correctly', () => {
  const data = {
    localId: 1,
    text: '',
    description: 'desc',
    isRequired: 0,
  };
  const extraData = {
    removeCallback: (localId) => {
      return localId;
    },
  };
  const {getByTestId} = render(
    <SubtaskCreationListItem data={data} extraData={extraData} />,
  );

  fireEvent.press(getByTestId('deleteSubtaskIconButton'));
});
