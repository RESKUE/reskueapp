import React from 'react';
import {PermissionsAndroid} from 'react-native';

export default function usePermission(permission, title, message) {
  const [granted, setGranted] = React.useState(null);

  const request = React.useCallback(async () => {
    try {
      const result = await PermissionsAndroid.request(permission, {
        title: title,
        message: message,
        buttonNegative: 'Abbrechen',
        buttonPositive: 'Ok',
      });
      setGranted(result === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
      setGranted(false);
    }
  }, [permission, title, message, setGranted]);

  return {granted, request};
}
