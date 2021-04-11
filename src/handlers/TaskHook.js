import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useTask() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await client.request(url, options, policy);
    },
    [client],
  );

  const post = React.useCallback(
    async (data) => {
      const url = `${Config.APP_REST_BASE_URL}/task`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const policy = FetchPolicy.networkOnly;
      return await client.request(url, options, policy);
    },
    [client],
  );

  const put = React.useCallback(
    async (id, data) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const policy = FetchPolicy.networkOnly;
      return await client.request(url, options, policy);
    },
    [client],
  );

  const del = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {method: 'DELETE'};
      const policy = FetchPolicy.networkOnly;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get, post, put, del};
}
