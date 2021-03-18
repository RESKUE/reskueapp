import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl + '/userGroup';

export default function useUsergroups() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestUsergroups = React.useCallback(async () => {
    const url = baseUrl + '?' + query;
    await client.request(url, options, policy);
  }, [query, client]);

  return {result, requestUsergroups, setQuery};
}
