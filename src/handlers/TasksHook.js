import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useTasks() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestTasks = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/task?${query}`;
    const policy = FetchPolicy.cacheAndNetwork;
    const options = {method: 'GET'};
    return await client.request(url, options, policy);
  }, [query, client]);

  const requestUserTasks = React.useCallback(
    async (userId) => {
      const url = `${Config.APP_REST_BASE_URL}/user/${userId}/helperTasks?${query}`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'GET'};
      return await client.request(url, options, policy);
    },
    [query, client],
  );

  return {result, setQuery, requestTasks, requestUserTasks};
}
