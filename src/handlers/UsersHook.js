import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useUsers() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestUsers = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/user?${query}`;
    const options = {method: 'GET'};
    const policy = FetchPolicy.cacheAndNetwork;
    await client.request(url, options, policy);
  }, [query, client]);

  return {result, setQuery, requestUsers};
}
