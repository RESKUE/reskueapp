import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const baseUrl = appConfig.rest.baseUrl;

export default function useMedias() {
  const {client, result} = useClient();

  const get = React.useCallback(
    async (path) => {
      const url = `${baseUrl}/${path}`;
      await client.request(url, options, policy);
    },
    [client],
  );

  return {result, get};
}
