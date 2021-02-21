import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useAllAssetChildren(id) {
  const {client, result} = useClient({authenticated: true});

  const requestAllAssetChildren = React.useCallback(async () => {
    const url = appConfig.rest.baseUrl + `/culturalAsset/${id}/children`;
    await client.request(url, options, policy);
  }, [client, id]);

  return {
    result,
    requestAllAssetChildren,
  };
}
