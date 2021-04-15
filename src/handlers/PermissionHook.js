import React from 'react';
import {PermissionsAndroid} from 'react-native';

export default function usePermission(permission) {
  const [granted, setGranted] = React.useState(null);
  const [requested, setRequested] = React.useState(false);

  const request = React.useCallback(async () => {
    // Prevent that the same permission is asked multiple times due to screen reloads.
    if (requested) {
      return;
    }
    setRequested(true);

    try {
      const result = await PermissionsAndroid.request(permission);
      setGranted(result === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.log('Error requesting permissions:', err);
      setGranted(false);
    }
  }, [requested, permission, setGranted]);

  return {granted, request};
}
