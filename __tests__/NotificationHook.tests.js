import {act, renderHook} from '@testing-library/react-hooks';
import useNotification from '../src/handlers/NotificationHook';

test('request notification works correctly', async () => {
  const networkData = {title: 'Notification'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useNotification());

  await act(async () => {
    result.current.get(1);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});

test('post notification works correctly', async () => {
  const networkData = {title: 'Notification'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useNotification());

  const response = await result.current.post(networkData);

  expect(response.data).toMatchObject(networkData);
});
