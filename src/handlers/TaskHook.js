import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useTask() {
  const {client: getClient, result: getResult} = useClient({
    authenticated: true,
  });
  const {client: deletionClient} = useClient({
    authenticated: true,
  });

  const requestTask = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {method: 'GET'};
      const policy = FetchPolicy.cacheAndNetwork;
      await getClient.request(url, options, policy);
    },
    [getClient],
  );

  const requestTaskDeletion = React.useCallback(
    async (id) => {
      const url = `${Config.APP_REST_BASE_URL}/task/${id}`;
      const options = {method: 'DELETE'};
      const policy = FetchPolicy.cacheAndNetwork;
      return await deletionClient.request(url, options, policy);
    },
    [deletionClient],
  );

  return {getResult, requestTask, requestTaskDeletion};
}
