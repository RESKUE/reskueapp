import {act, renderHook} from '@testing-library/react-hooks';
import useComments from '../src/handlers/CommentsHook';

test('request assets works correctly', async () => {
  const networkData = [{text: 'comment'}];
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useComments());

  const path = '/culturalAsset/1/comments';
  await act(async () => {
    result.current.get(path);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(networkData);
});
