import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

export default function useAsset() {
  const {client: requestClient, result} = useClient({authenticated: true});
  const {client} = useClient({authenticated: true});

  const requestAsset = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'GET'};
      await requestClient.request(url, options, policy);
    },
    [requestClient],
  );

  const post = React.useCallback(
    async (culturalAsset) => {
      const url = appConfig.rest.baseUrl + '/culturalAsset';
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
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
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
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'DELETE'};
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestAsset, post, put, remove};
}
