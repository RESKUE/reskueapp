import {act, renderHook} from '@testing-library/react-hooks';
import useTasks from '../src/handlers/TasksHook';

test('request tasks works correctly', async () => {
  const networkData = [{name: 'task'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTasks());

  await act(async () => {
    result.current.requestTasks();
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});

test('request user tasks works correctly', async () => {
  const networkData = [{name: 'task'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTasks());

  await act(async () => {
    result.current.requestUserTasks(1);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
