import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/tasks.json';

export default function useAllTasks() {
  const {client, result} = useClient();

  const requestAllTasks = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestAllTasks};
}
