import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/users.json';

export default function useAllUsers() {
  const {client, result} = useClient();

  const requestAllUsers = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestAllUsers};
}
