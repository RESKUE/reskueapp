import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useTaskHelpers() {
  const {client: getClient, result: getResult} = useClient({
    authenticated: true,
  });
  const {client: updateClient} = useClient({
    authenticated: true,
  });

  const requestTaskHelpers = React.useCallback(
    async (taskId) => {
      const url = appConfig.rest.baseUrl + `/task/${taskId}/helpers`;
      const options = {method: 'GET'};
      await getClient.request(url, options, policy);
    },
    [getClient],
  );

  const assignTaskHelper = React.useCallback(
    async (taskId, userId) => {
      const url =
        appConfig.rest.baseUrl + `/task/${taskId}/assignHelper/${userId}`;
      const options = {method: 'PUT'};
      return await updateClient.request(url, options, policy);
    },
    [updateClient],
  );

  const removeTaskHelper = React.useCallback(
    async (taskId, userId) => {
      const url =
        appConfig.rest.baseUrl + `/task/${taskId}/removeHelper/${userId}`;
      const options = {method: 'PUT'};
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
