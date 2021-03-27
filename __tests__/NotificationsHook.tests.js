import {act, renderHook} from '@testing-library/react-hooks';
import useNotifications from '../src/handlers/NotificationsHook';

test('request notifications works correctly', async () => {
  const networkData = [{title: 'Notification'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useNotifications());

  await act(async () => {
    result.current.get();
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
