import {renderHook} from '@testing-library/react-hooks';
import useComment from '../src/handlers/CommentHook';

test('post comment works correctly', async () => {
  const networkData = {text: 'comment'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useComment());

  const response = await result.current.post(networkData);

  expect(response.data).toMatchObject(networkData);
});

test('remove comment works correctly', async () => {
  const networkData = {deleted: true};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result} = renderHook(() => useComment());

  const response = await result.current.del(1);

  expect(response.data).toMatchObject(networkData);
});
