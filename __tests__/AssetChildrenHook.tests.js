import {renderHook} from '@testing-library/react-hooks';
import useAssetChildren from '../src/handlers/AssetChildrenHook';

test('request asset children works correctly', async () => {
  const id = 1;
  const {result, waitForNextUpdate} = renderHook(() => useAssetChildren(id));

  result.current.requestAssetChildren();

  await waitForNextUpdate();

  expect(result.current.result).not.toBe(null);
});
