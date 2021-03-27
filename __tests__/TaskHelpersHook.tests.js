import {act, renderHook} from '@testing-library/react-hooks';
import useTaskHelpers from '../src/handlers/TaskHelpersHook';

test('request task helpers works correctly', async () => {
  const networkData = [{name: 'user'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useTaskHelpers());

  await act(async () => {
    result.current.requestTaskHelpers(1);
    await waitForNextUpdate();
  });

  expect(result.current.getResult.data).toMatchObject(networkData);
});

test('assign helper works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTaskHelpers());

  const response = await result.current.assignTaskHelper(1, 2);

  expect(response.data).toMatchObject(networkData);
});

test('remove helper works correctly', async () => {
  const networkData = {name: 'task'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useTaskHelpers());

  const response = await result.current.removeTaskHelper(1, 2);

  expect(response.data).toMatchObject(networkData);
});
