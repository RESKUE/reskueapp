import {renderHook} from '@testing-library/react-hooks';
import useAsset from '../src/handlers/AssetHook';

test('request asset works correctly', async () => {
  fetch.mockOnce(JSON.stringify(asset));

  const {result} = renderHook(() => useAsset());

  const response = await result.current.requestAsset(id);

  expect(response.data).toMatchObject(asset);
});

test('post asset works correctly', async () => {
  fetch.mockOnce(JSON.stringify(asset));

  const {result} = renderHook(() => useAsset());

  const response = await result.current.post(asset);

  expect(response.data).toMatchObject(asset);
});

test('put asset works correctly', async () => {
  fetch.mockOnce(JSON.stringify(asset));

  const {result} = renderHook(() => useAsset());

  const response = await result.current.put(id, asset);

  expect(response.data).toMatchObject(asset);
});

test('remove asset works correctly', async () => {
  const networkData = {deleted: true};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useAsset());

  const response = await result.current.remove(id);

  expect(response.data).toMatchObject(networkData);
});

const id = 1;

const asset = {
  name: 'asset',
  longitude: 1.0,
  latitude: 1.0,
};
