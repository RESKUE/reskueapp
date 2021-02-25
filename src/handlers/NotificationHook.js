import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl + '/notification';

export default function useNotification(id) {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(async () => {
    const url = `${baseUrl}/${id}`;
    await client.request(url, options, policy);
  }, [client, id]);

  return {result, get};
}
