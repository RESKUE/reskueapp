import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useAssetTasks() {
  const {client, result} = useClient({authenticated: true});

  const requestAssetTasks = React.useCallback(
    async (assetId) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${assetId}/tasks`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {
    result,
    requestAssetTasks,
  };
}
