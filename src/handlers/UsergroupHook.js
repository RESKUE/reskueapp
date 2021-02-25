import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useUsergroup() {
  const {client: usergroupClient, result: usergroupResult} = useClient({
    authenticated: true,
  });
  const {client: usersClient, result: usersResult} = useClient({
    authenticated: true,
  });

  const requestUsergroup = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}`;
      await usergroupClient.request(url, options, policy);
    },
    [usergroupClient],
  );
  const requestUsergroupUsers = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}/users`;
      await usersClient.request(url, options, policy);
    },
    [usersClient],
  );

  return {
    usergroupResult,
    usersResult,
    requestUsergroup,
    requestUsergroupUsers,
  };
}
