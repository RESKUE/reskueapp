import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useUserMe() {
  const {client, result} = useClient({authenticated: true});

  const requestUserMe = React.useCallback(async () => {
    const url = appConfig.rest.baseUrl + '/user/me';
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestUserMe};
}
