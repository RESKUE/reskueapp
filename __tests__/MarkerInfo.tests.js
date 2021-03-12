import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MarkerInfo from '../src/components/MarkerInfo';

it('marker info renders correctly', () => {
  renderer.create(<MarkerInfo />);
});

it('marker info returns no children if visible is false', () => {
  const output = renderer.create(<MarkerInfo visible={false} />);
  expect(output.root.children).toEqual([]);
});
