import {PermissionsAndroid} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import usePermission from './PermissionHook';

export default function useRegion(delta, fallback) {
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
            ...(delta ?? DEFAULT_DELTA),
          });
        },
        (error) => {
          console.log(
            'Failed to get current position:',
            error.code,
            error.message,
          );
          setRegion(fallback ?? DEFAULT_COORDS);
        },
        {
          // Do not cache the previous location
          maximumAge: 0,
          // Timeout location fetching after 30 seconds
          timeout: 30000,
        },
      );
    } else if (granted === false) {
      setRegion(fallback ?? DEFAULT_COORDS);
    }
  }, [granted, delta, setRegion, fallback]);

  return {region};
}

const DEFAULT_COORDS = {
  latitude: 48.99897,
  longitude: 8.39991,
};

const DEFAULT_DELTA = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};
