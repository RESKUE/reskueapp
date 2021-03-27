import {act, renderHook} from '@testing-library/react-hooks';
import useUsergroup from '../src/handlers/UsergroupHook';

test('request usergroup works correctly', async () => {
  const networkData = {name: 'usergroup'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useUsergroup());

  await act(async () => {
    result.current.requestUsergroup(1);
    await waitForNextUpdate();
  });

  expect(result.current.usergroupResult.data).toMatchObject(networkData);
});

test('request usergroup users works correctly', async () => {
  const networkData = [{name: 'user'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useUsergroup());

  await act(async () => {
    result.current.requestUsergroupUsers(1);
    await waitForNextUpdate();
  });

  expect(result.current.usersResult.data).toMatchObject(networkData);
});

test('delete usergroup works correctly', async () => {
  const networkData = {deleted: true};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useUsergroup());

  const response = await result.current.requestUsergroupDeletion(1);

  expect(response.data).toMatchObject(networkData);
});
