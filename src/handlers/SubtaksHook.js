import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useSubtasks() {
  const {client, result} = useClient({authenticated: true});

  const requestSubtasks = React.useCallback(
    async (taskId) => {
      const url = appConfig.rest.baseUrl + `/task/${taskId}/subtasks`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestSubtasks};
}
