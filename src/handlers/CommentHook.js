import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const baseUrl = appConfig.rest.baseUrl;

export default function useComment() {
  const {client, result} = useClient({authenticated: true});

  const post = React.useCallback(
    async (data) => {
      const url = `${baseUrl}/comment/autoAuthor`;
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

  return {result, post};
}
