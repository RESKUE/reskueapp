import {act, renderHook} from '@testing-library/react-hooks';
import useTaskCreation from '../src/handlers/TaskCreationHook';

test('request task helpers works correctly', async () => {
  const networkData = [{name: 'task'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTaskCreation());

  await act(async () => {
    result.current.postTask(networkData);
    await waitForNextUpdate();
  });

  expect(result.current.taskResult.data).toMatchObject(networkData);
});

test('remove helper works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTaskCreation());

  const response = await result.current.putTask(networkData, 1);

  expect(response.data).toMatchObject(networkData);
});
