import {render} from '@testing-library/react-native';
import React from 'react';
import UserUnpressableListItem from '../src/components/listItems/UserUnpressableListItem';

it('user unpressable list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  render(<UserUnpressableListItem data={data} />);
});
