import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useNotifications() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const get = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/notification?${query}`;
    const policy = FetchPolicy.cacheAndNetwork;
    const options = {method: 'GET'};
    await client.request(url, options, policy);
  }, [query, client]);

  return {result, setQuery, get};
}
