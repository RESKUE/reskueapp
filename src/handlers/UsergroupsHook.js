import React from 'react';
import Config from 'react-native-config';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

export default function useUsergroups() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();
  const {client: myUsergroupClient, result: myUsergroupResult} = useClient({
    authenticated: true,
  });

  const requestUsergroups = React.useCallback(async () => {
    const url = `${Config.APP_REST_BASE_URL}/userGroup?${query}`;
    const policy = FetchPolicy.cacheAndNetwork;
    const options = {method: 'GET'};
    await client.request(url, options, policy);
  }, [query, client]);

  const requestMyUsergroups = React.useCallback(
    async (userId) => {
      const url = `${Config.APP_REST_BASE_URL}/user/${userId}/userGroups`;
      const policy = FetchPolicy.cacheAndNetwork;
      const options = {method: 'GET'};
      await myUsergroupClient.request(url, options, policy);
    },
    [myUsergroupClient],
  );

  return {
    result,
    myUsergroupResult,
    requestUsergroups,
    setQuery,
    requestMyUsergroups,
  };
}
