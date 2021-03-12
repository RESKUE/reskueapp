import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import ListActions from '../src/components/ListActions';

it('list actions render correctly', () => {
  renderer.create(<ListActions />);
});
