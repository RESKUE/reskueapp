import {PermissionsAndroid} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import usePermission from './PermissionHook';

export default function useRegion(
  delta = DEFAULT_DELTA,
  fallbackCoords = DEFAULT_COORDS,
) {
  const [region, setRegion] = React.useState(null);
  const {granted, request} = usePermission(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    'Standort Berechtigung',
    'Dein Standort wird benötigt, um deine Umgebung auf Karten anzuzeigen.',
  );

  React.useEffect(() => {
    request();
  });

  React.useEffect(() => {
    if (granted === true) {
      Geolocation.getCurrentPosition(
        (info) => {
          console.log('Current position:', info);
          setRegion({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            ...delta,
          });
        },
        (error) => {
          console.log(
            'Failed to get current position:',
            error.code,
            error.message,
          );
          setRegion({...delta, ...fallbackCoords});
        },
        {
          // Do not cache the previous location
          maximumAge: 0,
          // Timeout location fetching after 30 seconds
          timeout: 30000,
        },
      );
    } else if (granted === false) {
      console.log("No location perms granted, using fallback region");
      setRegion({...delta, ...fallbackCoords});
    }
  }, [granted, delta, setRegion, fallbackCoords]);

  return {region};
}

const DEFAULT_DELTA = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};

const DEFAULT_COORDS = {
  latitude: 48.99897,
  longitude: 8.39991,
};
