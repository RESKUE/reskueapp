import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useComment() {
  const {client, result} = useClient({authenticated: true});

  const post = React.useCallback(
    async (data) => {
      const url = `${Config.APP_REST_BASE_URL}/comment/autoAuthor`;
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

  const del = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/comment/${id}`;
      const options = {method: 'DELETE'};
      const policy = FetchPolicy.networkOnly;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, post, del};
}
