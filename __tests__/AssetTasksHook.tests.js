import {act, renderHook} from '@testing-library/react-hooks';
import useAssetTasks from '../src/handlers/AssetTasksHook';

test('request asset tasks works correctly', async () => {
  const networkData = [{name: 'task'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssetTasks(id));

  await act(async () => {
    result.current.requestAssetTasks();
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
