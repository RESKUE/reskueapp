import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useUsergroupCreation() {
  const {client, result} = useClient({
    authenticated: true,
  });

  const postUsergroup = React.useCallback(
    async (usergroup) => {
      const url = appConfig.rest.baseUrl + '/userGroup';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usergroup),
      };
      await client.request(url, options, policy);
    },
    [client],
  );

  const putUsergroup = React.useCallback(
    async (id, usergroup) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usergroup),
      };
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
