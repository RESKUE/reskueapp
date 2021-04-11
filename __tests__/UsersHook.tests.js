import {act, renderHook} from '@testing-library/react-hooks';
import useUsers from '../src/handlers/UsersHook';

test('request usergroup users works correctly', async () => {
  const networkData = [{name: 'user'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useUsers());

  await act(async () => {
    result.current.getUsergroupUsers(1);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
