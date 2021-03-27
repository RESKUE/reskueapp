import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useComments() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (path) => {
      const url = `${Config.APP_REST_BASE_URL}${path}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get};
}
