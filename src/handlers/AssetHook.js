import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useAsset() {
  const {client, result} = useClient({authenticated: true});

  const requestAsset = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestAsset};
}
