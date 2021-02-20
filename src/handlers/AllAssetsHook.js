import React from 'react';
import {useClient, FetchPolicy, Sorting} from '@ilt-pse/react-native-kueres';
import appConfig from '../../app.json';

const policy = FetchPolicy.cacheAndNetwork;
const options = {method: 'GET'};
const url = appConfig.rest.baseUrl + '/culturalAsset';

export default function useAllAssets() {
  const {client, result} = useClient({authenticated: true});
  const [nameSorting, setNameSorting] = React.useState(Sorting.none);
  const [distanceSorting, setDistanceSorting] = React.useState(Sorting.none);
  const [prioritySorting, setPrioritySorting] = React.useState(Sorting.none);
  const [endangeredFiltering, setEndangeredFiltering] = React.useState(null);
  const [distanceFiltering, setDistanceFiltering] = React.useState(0);
  const [priorityFiltering, setPriorityFiltering] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(null);

  const requestAllAssets = React.useCallback(async () => {
    await client.request(url, options, policy);
  }, [client]);

  return {
    result,
    nameSorting,
    setNameSorting,
    distanceSorting,
    setDistanceSorting,
    prioritySorting,
    setPrioritySorting,
    endangeredFiltering,
    setEndangeredFiltering,
    distanceFiltering,
    setDistanceFiltering,
    priorityFiltering,
    setPriorityFiltering,
    searchTerm,
    setSearchTerm,
    requestAllAssets,
  };
}
