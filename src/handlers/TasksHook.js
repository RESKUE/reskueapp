import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = appConfig.rest.baseUrl + '/task';

export default function useTasks() {
  const {client, result} = useClient({authenticated: true});

  const requestTasks = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestTasks};
}
