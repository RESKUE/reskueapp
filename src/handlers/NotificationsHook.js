import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl;

export default function useNotifications() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const get = React.useCallback(async () => {
    const url = baseUrl + '/notification?' + query;
    console.log('url dins:', url);
    await client.request(url, options, policy);
  }, [query, client]);

  return {result, setQuery, get};
}
