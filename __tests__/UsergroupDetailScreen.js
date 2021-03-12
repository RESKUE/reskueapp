import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import UsergroupDetailScreen from '../src/screens/detail/UsergroupDetailScreen';

it('usergroup detail screen renders correctly', () => {
  const route = {params: {id: 1}};
  renderer.create(<UsergroupDetailScreen route={route} />);
});
