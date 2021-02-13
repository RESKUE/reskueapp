import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/media.json';

export default function useAllMedia() {
  const {client, result} = useClient();

  const requestAllMedia = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestAllMedia};
}
