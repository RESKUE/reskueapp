import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UserUnpressableListItem from '../src/components/listItems/UserUnpressableListItem';

it('user unpressable list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  renderer.create(<UserUnpressableListItem data={data} />);
});
