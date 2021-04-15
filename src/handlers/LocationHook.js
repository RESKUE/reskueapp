import {PermissionsAndroid} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import usePermission from './PermissionHook';

export default function useLocation(fallback = DEFAULT_COORDS) {
  const [location, setLocation] = React.useState(null);
  const {granted, request} = usePermission(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  React.useEffect(() => {
    request();
  });

  React.useEffect(() => {
    if (granted === true) {
      Geolocation.getCurrentPosition(
        (info) => {
          console.log('Current position:', info);
          setLocation(info.coords);
        },
        (error) => {
          console.log(
            'Failed to get current position:',
            error.code,
            error.message,
          );
          setLocation(fallback);
        },
        {
          // Do not cache the previous location
          maximumAge: 0,
          // Timeout location fetching after 30 seconds
          timeout: 30000,
        },
      );
    } else if (granted === false) {
      console.log('No location perms granted, using fallback region');
      setLocation(fallback);
    }
  }, [granted, setLocation, fallback]);

  return {location};
}

const DEFAULT_COORDS = {
  latitude: 48.99897,
  longitude: 8.39991,
};
