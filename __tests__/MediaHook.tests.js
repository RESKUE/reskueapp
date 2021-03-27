import {act, renderHook} from '@testing-library/react-hooks';
import useMedia from '../src/handlers/MediaHook';

test('request media works correctly', async () => {
  fetch.mockOnce(JSON.stringify(formData));

  const {result, waitForNextUpdate} = renderHook(() => useMedia());

  const path = '/culturalAsset/1/media';
  await act(async () => {
    result.current.get(path);
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject(formData);
});

test('post media works correctly', async () => {
  fetch.mockOnce(JSON.stringify(formData));

  const {result} = renderHook(() => useMedia());

  const response = await result.current.post(formData);

  expect(response.data).toMatchObject(formData);
});

const formData = {content: 'media'};
