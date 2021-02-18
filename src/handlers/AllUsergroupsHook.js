import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/groups.json';

export default function useAllUsergroups() {
  const {client, result} = useClient();

  const requestAllUsergroups = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestAllUsergroups};
}
