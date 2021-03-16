import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const baseUrl = appConfig.rest.baseUrl;

export default function useMedia() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (path) => {
      const url = `${baseUrl}/${path}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  const post = React.useCallback(
    async (path, formData) => {
      const url = `${baseUrl}/${path}`;
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
