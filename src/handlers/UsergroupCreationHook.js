import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useUsergroupCreation() {
  const {client, result} = useClient({
    authenticated: true,
  });

  const postUsergroup = React.useCallback(
    async (usergroup) => {
      const url = `${Config.APP_REST_BASE_URL}/userGroup`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usergroup),
      };
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  const putUsergroup = React.useCallback(
    async (id, usergroup) => {
      const url = `${Config.APP_REST_BASE_URL}/userGroup/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usergroup),
      };
      const policy = FetchPolicy.cacheAndNetwork;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {
    result,
    postUsergroup,
    putUsergroup,
  };
}
