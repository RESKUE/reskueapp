import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/assets.json';

export default function useAllAssets() {
  const {client, result} = useClient();

  const requestAllAssets = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestAllAssets};
}
