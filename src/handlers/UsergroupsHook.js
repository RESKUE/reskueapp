import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl + '/userGroup';

export default function useUsergroups() {
  const {client, result} = useClient({authenticated: true});
  const [query, setQuery] = React.useState();
  const {client: myUsergroupClient, result: myUsergroupResult} = useClient({
    authenticated: true,
  });

  const requestUsergroups = React.useCallback(async () => {
    const url = baseUrl + '?' + query;
    await client.request(url, options, policy);
  }, [query, client]);

  const requestMyUsergroups = React.useCallback(
    async (userId) => {
      const url = appConfig.rest.baseUrl + `/user/${userId}/userGroups`;
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
