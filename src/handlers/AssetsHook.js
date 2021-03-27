import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useAssets() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestAssets = React.useCallback(async () => {
    const policy = FetchPolicy.cacheAndNetwork;
    const options = {method: 'GET'};
    const url = `${Config.APP_REST_BASE_URL}'/culturalAsset?${query}`;
    await client.request(url, options, policy);
  }, [query, client]);

  return {result, setQuery, requestAssets};
}
