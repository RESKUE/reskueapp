import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};

export default function useMedia(id) {
  const {client, result} = useClient();

  const requestMedia = React.useCallback(async () => {
    const url = `https://lunaless.com/reskue/media/${id}.json`;
    await client.request(url, options, policy);
  }, [client]);

  return {result, requestMedia};
}
