import {render, fireEvent} from '@testing-library/react-native';
import {Marker} from 'react-native-maps-osmdroid';
import React from 'react';
import PinMarker from '../src/components/PinMarker';

test('pin marker renders correctly', () => {
  const coordinate = {latitude: 0, longitude: 0};
  render(<PinMarker coordinate={coordinate} />);
});

test('the pin markers callback', () => {
  const onDrag = jest.fn();
  const {UNSAFE_getByType} = render(
    <PinMarker coordinate={{latitude: 0, longitude: 0}} onDrag={onDrag} />,
  );

  const dragCoord = {latitude: 42, longitude: 42};
  fireEvent(UNSAFE_getByType(Marker), 'drag', {
    nativeEvent: {coordinate: dragCoord},
  });

  expect(onDrag.mock.calls.length).toBe(1);
  expect(onDrag.mock.calls[0][0]).toMatchObject(dragCoord);
});

test('the pin markers callback is optional', () => {
  const {UNSAFE_getByType} = render(
    <PinMarker coordinate={{latitude: 0, longitude: 0}} />,
  );

  const dragCoord = {latitude: 42, longitude: 42};
  fireEvent(UNSAFE_getByType(Marker), 'drag', {
    nativeEvent: {coordinate: dragCoord},
  });
});
