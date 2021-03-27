import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useNotification() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/notification/${id}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  const post = React.useCallback(
    async (data) => {
      const url = `${Config.APP_REST_BASE_URL}/notification/autoSender`;
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      };
      const policy = FetchPolicy.networkOnly;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get, post};
}
