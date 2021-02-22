import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const url = appConfig.rest.baseUrl + '/culturalAsset';

export default function useAssetCreation() {
  const {client, result} = useClient({authenticated: true});

  const postAsset = React.useCallback(
    async (culturalAsset) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(culturalAsset),
      };
      await client.request(url, options, policy);
    },
    [client],
  );

  return {
    result,
    postAsset,
  };
}
