import {renderHook} from '@testing-library/react-hooks';
import useAsset from '../src/handlers/AssetHook';

test('request asset works correctly', async () => {
  const {result} = renderHook(() => useAsset());

  const response = await result.current.requestAsset(id);

  expect(response).not.toBe(null);
});

test('post asset works correctly', async () => {
  const {result} = renderHook(() => useAsset());

  const response = await result.current.post(asset);

  expect(response).not.toBe(null);
});

test('put asset works correctly', async () => {
  const {result} = renderHook(() => useAsset());

  const response = await result.current.put(id, asset);

  expect(response).not.toBe(null);
});

test('remove asset works correctly', async () => {
  const {result} = renderHook(() => useAsset());

  const response = await result.current.remove(id);

  expect(response).not.toBe(null);
});

const id = 1;

const asset = {
  name: 'asset',
  longitude: 1.0,
  latitude: 1.0,
};
