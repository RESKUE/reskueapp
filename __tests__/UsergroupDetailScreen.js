import {render} from '@testing-library/react-native';
import React from 'react';
import UsergroupDetailScreen from '../src/screens/detail/UsergroupDetailScreen';

it('usergroup detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  render(<UsergroupDetailScreen route={route} />);
});
