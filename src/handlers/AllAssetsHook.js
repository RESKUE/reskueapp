import React from 'react';
import {useClient, FetchPolicy, useQuery} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = appConfig.rest.baseUrl + '/culturalAsset';

export default function useAllAssets() {
  const {client, result} = useClient({authenticated: true});
  const {query, updateFilters, updateSorters} = useQuery();

  const requestAllAssets = React.useCallback(async () => {
    const fullUrl = url + '?' + query;
    await client.request(fullUrl, options, policy);
  }, [query, client]);

  return {
    result,
    requestAllAssets,
    updateFilters,
    updateSorters,
  };
}
