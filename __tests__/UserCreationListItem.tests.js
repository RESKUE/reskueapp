import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UserCreationListItem from '../src/components/listItems/UserCreationListItem';

it('user creation list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  renderer.create(<UserCreationListItem data={data} />);
});
