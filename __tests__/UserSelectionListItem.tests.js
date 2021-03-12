import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UserSelectionListItem from '../src/components/listItems/UserCreationListItem';

it('user selection list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  renderer.create(<UserSelectionListItem data={data} />);
});
