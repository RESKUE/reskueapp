import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useTasks() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();

  const requestTasks = React.useCallback(async () => {
    const url = appConfig.rest.baseUrl + '/task?' + query;
    await client.request(url, options, policy);
  }, [query, client]);

  const requestUserTasks = React.useCallback(
    async (userId) => {
      const url = `${appConfig.rest.baseUrl}/user/${userId}/helperTasks?${query}`;
      await client.request(url, options, policy);
    },
    [query, client],
  );

  return {result, setQuery, requestTasks, requestUserTasks};
}
