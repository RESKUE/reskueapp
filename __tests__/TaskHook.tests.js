import {act, renderHook} from '@testing-library/react-hooks';
import useTask from '../src/handlers/TaskHook';

test('request task works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTask());

  await act(async () => {
    result.current.requestTask(1);
    await waitForNextUpdate();
  });

  expect(result.current.getResult.data).toMatchObject(networkData);
});

test('delete task works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTask());

  const response = await result.current.requestTaskDeletion(1);

  expect(response.data).toMatchObject(networkData);
});
