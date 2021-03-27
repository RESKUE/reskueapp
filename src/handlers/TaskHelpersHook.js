import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useTaskHelpers() {
  const {client: getClient, result: getResult} = useClient({
    authenticated: true,
  });
  const {client: updateClient} = useClient({
    authenticated: true,
  });

  const requestTaskHelpers = React.useCallback(
    async (taskId) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${taskId}/helpers`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await getClient.request(url, options, policy);
    },
    [getClient],
  );

  const assignTaskHelper = React.useCallback(
    async (taskId, userId) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${taskId}/assignHelper/${userId}`;
      const options = {method: 'PUT'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await updateClient.request(url, options, policy);
    },
    [updateClient],
  );

  const removeTaskHelper = React.useCallback(
    async (taskId, userId) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${taskId}/removeHelper/${userId}`;
      const options = {method: 'PUT'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await updateClient.request(url, options, policy);
    },
    [updateClient],
  );

  return {
    getResult,
    requestTaskHelpers,
    assignTaskHelper,
    removeTaskHelper,
  };
}
