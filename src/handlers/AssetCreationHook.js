import React from 'react';
import {useClient, FetchPolicy} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;

export default function useAssetCreation() {
  const {client, result} = useClient({authenticated: true});
  const {client: parentClient} = useClient({authenticated: true});
  const {client: childClient} = useClient({authenticated: true});

  const postAsset = React.useCallback(
    async (culturalAsset) => {
      const url = appConfig.rest.baseUrl + '/culturalAsset';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(culturalAsset),
      };
      await client.request(url, options, policy);
    },
    [client],
  );

  const putSetParent = React.useCallback(
    async (assetId, parentId) => {
      const url =
        appConfig.rest.baseUrl +
        `/culturalAsset/${assetId}/setParent/${parentId}`;
      const options = {method: 'PUT'};
      await parentClient.request(url, options, policy);
    },
    [parentClient],
  );

  const putAddChild = React.useCallback(
    async (assetId, childId) => {
      const url =
        appConfig.rest.baseUrl +
        `/culturalAsset/${assetId}/addChild/${childId}`;
      const options = {method: 'PUT'};
      await childClient.request(url, options, policy);
    },
    [childClient],
  );

  return {
    result,
    postAsset,
    putSetParent,
    putAddChild,
  };
}
