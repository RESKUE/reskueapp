import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useMedia() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (path) => {
      const url = `${Config.APP_REST_BASE_URL}/${path}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  const post = React.useCallback(
    async (formData) => {
      const url = `${Config.APP_REST_BASE_URL}/media`;
      const options = {
        method: 'POST',
        body: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const policy = FetchPolicy.noCache;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get, post};
}
