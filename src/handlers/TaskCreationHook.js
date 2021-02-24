import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useTaskCreation() {
  const {client: taskClient, result: taskResult} = useClient({
    authenticated: true,
  });
  const {client: subtaskPostClient, result: subtaskPostResult} = useClient({
    authenticated: true,
  });
  const {client: subtaskDeleteClient, result: subtaskDeleteResult} = useClient({
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

  const postSubtask = React.useCallback(
    async (subtask) => {
      const url = appConfig.rest.baseUrl + '/subtask';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtask),
      };
      await subtaskPostClient.request(url, options, policy);
    },
    [subtaskPostClient],
  );

  const requestSubtaskDeletion = React.useCallback(
    async (subtaskId) => {
      const url = appConfig.rest.baseUrl + `/subtask/${subtaskId}`;
      const options = {method: 'DELETE'};
      await subtaskDeleteClient.request(url, options, policy);
    },
    [subtaskDeleteClient],
  );

  return {
    taskResult,
    subtaskPostResult,
    subtaskDeleteResult,
    postTask,
    postSubtask,
    requestSubtaskDeletion,
  };
}
