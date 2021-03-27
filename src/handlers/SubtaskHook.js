import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useSubtask() {
  const {client} = useClient({authenticated: true});

  const putSubtask = React.useCallback(
    async (subtaskId, subtask) => {
      const url = `${Config.APP_REST_BASE_URL}/subtask/${subtaskId}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtask),
      };
      const policy = FetchPolicy.cacheAndNetwork;
      return await client.request(url, options, policy);
    },
    [client],
  );

  return {putSubtask};
}
