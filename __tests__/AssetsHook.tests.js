import {renderHook} from '@testing-library/react-hooks';
import useAssets from '../src/handlers/AssetsHook';

test('request assets works correctly', async () => {
  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssets(id));

  result.current.requestAssets();

  await waitForNextUpdate();

  expect(result.current.result).not.toBe(null);
});
