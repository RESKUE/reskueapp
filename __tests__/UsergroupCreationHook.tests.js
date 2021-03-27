import {act, renderHook} from '@testing-library/react-hooks';
import useUsergroupCreation from '../src/handlers/UsergroupCreationHook';

test('post usergroup works correctly', async () => {
  const networkData = {name: 'usergroup'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useUsergroupCreation());

  await act(async () => {
    result.current.postUsergroup(networkData);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});

test('put usergroup works correctly', async () => {
  const networkData = {name: 'usergroup'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useUsergroupCreation());

  await act(async () => {
    result.current.putUsergroup(networkData);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
