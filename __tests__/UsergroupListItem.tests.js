import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UsergroupListItem from '../src/components/listItems/UsergroupListItem';

it('usergroup list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  renderer.create(<UsergroupListItem data={data} />);
});
