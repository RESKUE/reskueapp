import {renderHook} from '@testing-library/react-hooks';
import useAssetTasks from '../src/handlers/AssetTasksHook';

test('request asset tasks works correctly', async () => {
  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssetTasks(id));

  result.current.requestAssetTasks();

  await waitForNextUpdate();

  expect(result.current.result).not.toBe(null);
});
