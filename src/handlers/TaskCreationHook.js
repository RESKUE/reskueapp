import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useTaskCreation() {
  const {client: taskClient, result: taskResult} = useClient({
    authenticated: true,
  });

  const postTask = React.useCallback(
    async (task) => {
      const url = appConfig.rest.baseUrl + '/task';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      };
      await taskClient.request(url, options, policy);
    },
    [taskClient],
  );

  const putTask = React.useCallback(
    async (id, task) => {
      const url = appConfig.rest.baseUrl + `/task/${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      };
      await taskClient.request(url, options, policy);
    },
    [taskClient],
  );

  return {
    taskResult,
    postTask,
    putTask,
  };
}
