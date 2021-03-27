import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useAssetChildren(id) {
  const {client, result} = useClient({authenticated: true});

  const requestAssetChildren = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/culturalAsset/${id}/children`;
    const policy = FetchPolicy.cacheAndNetwork;
    const options = {method: 'GET'};
    await client.request(url, options, policy);
  }, [client, id]);

  return {
    result,
    requestAssetChildren,
  };
}
