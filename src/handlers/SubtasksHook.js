import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useSubtasks() {
  const {client, result} = useClient({authenticated: true});

  const get = React.useCallback(
    async (taskId) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${taskId}/subtasks`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get};
}
