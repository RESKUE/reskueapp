import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useTask() {
  const {client, result} = useClient({authenticated: true});

  const requestTask = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/task/${id}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestTask};
}
