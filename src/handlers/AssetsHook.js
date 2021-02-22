import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = appConfig.rest.baseUrl + '/culturalAsset';

export default function useAssets() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestAssets = React.useCallback(async () => {
    const fullUrl = url + '?' + query;
    await client.request(fullUrl, options, policy);
  }, [query, client]);

  return {result, setQuery, requestAssets};
}
