import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useAsset() {
  const {client: requestClient, result} = useClient({authenticated: true});
  const {client} = useClient({authenticated: true});

  const requestAsset = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'GET'};
      return await requestClient.request(url, options, policy);
    },
    [requestClient],
  );

  const post = React.useCallback(
    async (culturalAsset) => {
      const url = `${Config.APP_REST_BASE_URL}/culturalAsset`;
      const policy = FetchPolicy.networkOnly;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(culturalAsset),
      };
      return await client.request(url, options, policy);
    },
    [client],
  );

  const put = React.useCallback(
    async (id, data) => {
      const url = `${Config.APP_REST_BASE_URL}/culturalAsset/${id}`;
      const policy = FetchPolicy.networkOnly;
      const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      };
      return await client.request(url, options, policy);
    },
    [client],
  );

  const remove = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'DELETE'};
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestAsset, post, put, remove};
}
