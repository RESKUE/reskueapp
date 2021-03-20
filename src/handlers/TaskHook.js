import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useTask() {
  const {client: getClient, result: getResult} = useClient({
    authenticated: true,
  });
  const {client: deletionClient} = useClient({
    authenticated: true,
  });

  const requestTask = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/task/${id}`;
      const options = {method: 'GET'};
      await getClient.request(url, options, policy);
    },
    [getClient],
  );

  const requestTaskDeletion = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/task/${id}`;
      const options = {method: 'DELETE'};
      return await deletionClient.request(url, options, policy);
    },
    [deletionClient],
  );

  return {getResult, requestTask, requestTaskDeletion};
}
