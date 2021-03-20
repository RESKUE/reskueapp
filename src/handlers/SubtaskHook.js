import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useSubtask() {
  const {client, result} = useClient({authenticated: true});

  const putSubtask = React.useCallback(
    async (subtaskId, subtask) => {
      const url = appConfig.rest.baseUrl + `/subtask/${subtaskId}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtask),
      };
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, putSubtask};
}
