import {act, renderHook} from '@testing-library/react-hooks';
import useAssets from '../src/handlers/AssetsHook';

test('request assets works correctly', async () => {
  const networkData = [{name: 'asset'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssets(id));

  await act(async () => {
    result.current.requestAssets();
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
