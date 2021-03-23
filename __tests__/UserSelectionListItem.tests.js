import {render} from '@testing-library/react-native';
import React from 'react';
import UserSelectionListItem from '../src/components/listItems/UserCreationListItem';

it('user selection list item renders correctly', () => {
  const data = {id: 1, name: 'name'};
  render(<UserSelectionListItem data={data} />);
});
