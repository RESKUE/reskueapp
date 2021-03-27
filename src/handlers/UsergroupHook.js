import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

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
      const url = `${Config.APP_REST_BASE_URL}/userGroup/${id}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await usergroupClient.request(url, options, policy);
    },
    [usergroupClient],
  );

  const requestUsergroupUsers = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/userGroup/${id}/users`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await usersClient.request(url, options, policy);
    },
    [usersClient],
  );

  const requestUsergroupDeletion = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/userGroup/${id}`;
      const options = {method: 'DELETE'};
      const policy = FetchPolicy.cacheAndNetwork;
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
