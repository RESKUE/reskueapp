import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useTaskCreation() {
  const {client: taskClient, result: taskResult} = useClient({
    authenticated: true,
  });

  const postTask = React.useCallback(
    async (task) => {
      const url = `${Config.APP_REST_BASE_URL}/task`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      };
      const policy = FetchPolicy.cacheAndNetwork;
      await taskClient.request(url, options, policy);
    },
    [taskClient],
  );

  const putTask = React.useCallback(
    async (id, task) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      };
      const policy = FetchPolicy.cacheAndNetwork;
      return await taskClient.request(url, options, policy);
    },
    [taskClient],
  );

  return {
    taskResult,
    postTask,
    putTask,
  };
}
