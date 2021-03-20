import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

export default function useAsset() {
  const {client, result} = useClient({authenticated: true});
  const {client: deletionClient} = useClient({authenticated: true});

  const requestAsset = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'GET'};
      await client.request(url, options, policy);
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
      await client.request(url, options, policy);
    },
    [client],
  );

  const requestAssetDeletion = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/culturalAsset/${id}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'DELETE'};
      return await deletionClient.request(url, options, policy);
    },
    [deletionClient],
  );

  return {result, requestAsset, put, requestAssetDeletion};
}
