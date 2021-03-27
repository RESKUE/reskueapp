import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useUserMe() {
  const {client, result} = useClient({authenticated: true});

  const requestUserMe = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/user/me`;
    const options = {method: 'GET'};
    const policy = FetchPolicy.cacheAndNetwork;
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestUserMe};
}
