import {act, renderHook} from '@testing-library/react-hooks';
import useTask from '../src/handlers/TaskHook';

test('request task works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTask());

  await act(async () => {
    result.current.get(1);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});

test('delete task works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTask());

  const response = await result.current.del(1);

  expect(response.data).toMatchObject(networkData);
});

test('creating a task works correctly', async () => {
  const networkData = [{name: 'task'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTask());

  await act(async () => {
    result.current.post(networkData);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});

test('updating tasks works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTask());

  const response = await result.current.put(networkData, 1);

  expect(response.data).toMatchObject(networkData);
});
