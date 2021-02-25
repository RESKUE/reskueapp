import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'DELETE'};

export default function useUsergroupDeletion() {
  const {client, result} = useClient({authenticated: true});

  const requestUsergroupDeletion = React.useCallback(
    async (id) => {
      const url = appConfig.rest.baseUrl + `/userGroup/${id}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, requestUsergroupDeletion};
}
