import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useUsers() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestUsers = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/user?${query}`;
    const options = {method: 'GET'};
    const policy = FetchPolicy.cacheAndNetwork;
    return await client.request(url, options, policy);
  }, [query, client]);

  const getUsergroupUsers = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/userGroup/${id}/users`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, setQuery, requestUsers, getUsergroupUsers};
}
