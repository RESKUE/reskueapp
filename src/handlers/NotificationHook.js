import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const baseUrl = appConfig.rest.baseUrl + '/notification';

export default function useNotification() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (id) => {
      const url = `${baseUrl}/${id}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  const post = React.useCallback(
    async (data) => {
      const url = `${baseUrl}`;
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      };
      const policy = FetchPolicy.networkOnly;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get, post};
}
