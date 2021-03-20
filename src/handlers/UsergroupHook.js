import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useUsergroup() {
  const {client: usergroupClient, result: usergroupResult} = useClient({
    authenticated: true,
  });
  const {client: usersClient, result: usersResult} = useClient({
    authenticated: true,
  });
  const {client: deletionClient} = useClient({
    authenticated: true,
  });

  const requestUsergroup = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}`;
      const options = {method: 'GET'};
      await usergroupClient.request(url, options, policy);
    },
    [usergroupClient],
  );

  const requestUsergroupUsers = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}/users`;
      const options = {method: 'GET'};
      await usersClient.request(url, options, policy);
    },
    [usersClient],
  );

  const requestUsergroupDeletion = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}`;
      const options = {method: 'DELETE'};
      return await deletionClient.request(url, options, policy);
    },
    [deletionClient],
  );

  return {
    usergroupResult,
    usersResult,
    requestUsergroup,
    requestUsergroupUsers,
    requestUsergroupDeletion,
  };
}
