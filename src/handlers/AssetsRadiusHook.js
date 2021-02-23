import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl + '/culturalAsset/radius';

export default function useAllAssets() {
  const {client, result} = useClient({authenticated: true});

  const request = React.useCallback(
    async (longitude, latitude, radius) => {
      const url = `${baseUrl}?longitude=${longitude}&latitude=${latitude}&radius=${radius}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, request};
}
