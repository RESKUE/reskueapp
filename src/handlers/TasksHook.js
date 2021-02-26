import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useTasks() {
  const {client, result} = useClient({authenticated: true});

  const requestTasks = React.useCallback(async () => {
    const url = appConfig.rest.baseUrl + '/task';
    await client.request(url, options, policy);
  }, [client]);

  const requestUserTasks = React.useCallback(
    async (userId) => {
      const url = `${appConfig.rest.baseUrl}/user/${userId}/helperTasks`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestTasks, requestUserTasks};
}
