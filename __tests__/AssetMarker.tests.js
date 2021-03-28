import {render, fireEvent} from '@testing-library/react-native';
import {Marker} from 'react-native-maps-osmdroid';
import React from 'react';
import AssetMarker from '../src/components/AssetMarker';

test('asset marker renders correctly', () => {
  const coordinate = {latitude: 0, longitude: 0};
  render(<AssetMarker coordinate={coordinate} />);
});

test('the asset markers callback', () => {
  const onPress = jest.fn();
  const {UNSAFE_getByType} = render(
    <AssetMarker
      title="Church"
      description="Holy"
      identifier="42"
      coordinate={{latitude: 0, longitude: 0}}
      onPress={onPress}
    />,
  );

  fireEvent.press(UNSAFE_getByType(Marker));

  expect(onPress.mock.calls.length).toBe(1);
  expect(onPress.mock.calls[0][0].title).toBe('Church');
  expect(onPress.mock.calls[0][0].description).toBe('Holy');
  expect(onPress.mock.calls[0][0].identifier).toBe('42');
  expect(onPress.mock.calls[0][0].coordinate).toMatchObject({
    latitude: 0,
    longitude: 0,
  });
});

test('the asset markers callback is optional', () => {
  const {UNSAFE_getByType} = render(
    <AssetMarker
      title="Church"
      description="Holy"
      identifier="42"
      coordinate={{latitude: 0, longitude: 0}}
    />,
  );
  fireEvent.press(UNSAFE_getByType(Marker));
});
