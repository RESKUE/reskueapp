import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'DELETE'};

export default function useAssetDeletion() {
  const {client, result} = useClient({authenticated: true});

  const requestAssetDeletion = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestAssetDeletion};
}
