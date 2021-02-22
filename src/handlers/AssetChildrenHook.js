import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useAssetChildren(id) {
  const {client, result} = useClient({authenticated: true});

  const requestAssetChildren = React.useCallback(async () => {
    const url = appConfig.rest.baseUrl + `/culturalAsset/${id}/children`;
    await client.request(url, options, policy);
  }, [client, id]);

  return {
    result,
    requestAssetChildren,
  };
}
