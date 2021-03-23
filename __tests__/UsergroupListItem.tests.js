import {render} from '@testing-library/react-native';
import React from 'react';
import UsergroupListItem from '../src/components/listItems/UsergroupListItem';

it('usergroup list item renders correctly', () => {
  const data = {id: 1, name: 'name', description: 'desc'};
  render(<UsergroupListItem data={data} />);
});
