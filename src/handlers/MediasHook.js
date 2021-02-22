import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = 'https://lunaless.com/reskue/media.json';

export default function useMedias() {
  const {client, result} = useClient();

  const requestMedias = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestMedias};
}
