import {act, renderHook} from '@testing-library/react-hooks';
import useAssetChildren from '../src/handlers/AssetChildrenHook';

test('request asset children works correctly', async () => {
  const networkData = [{name: 'asset'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssetChildren(id));

  await act(async () => {
    result.current.requestAssetChildren();
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
