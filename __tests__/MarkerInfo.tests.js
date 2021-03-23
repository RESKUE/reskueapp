import {render} from '@testing-library/react-native';
import React from 'react';
import MarkerInfo from '../src/components/MarkerInfo';

it('marker info renders correctly', () => {
  render(<MarkerInfo />);
});

it('marker info returns no children if visible is false', () => {
  const {container} = render(<MarkerInfo visible={false} />);
  expect(container.children).toEqual([]);
});
