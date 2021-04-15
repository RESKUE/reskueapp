import React from 'react';
import {StyleSheet} from 'react-native';
import {LoadingIndicator} from '@ilt-pse/react-native-kueres';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import MapContainer from '../../components/MapContainer';
import PinMarker from '../../components/PinMarker';
import MarkerInfo from '../../components/MarkerInfo';
import useLocation from '../../handlers/LocationHook';

export default function LocationSelectionScreen({navigation, route}) {
  const {location: currentLocation} = useLocation();
  const [location, setLocation] = React.useState(null);
  const [initialRegion, setInitialRegion] = React.useState(null);
  const preselectedLocation = route?.params?.location ?? null;

  React.useEffect(() => {
    const coords = preselectedLocation ?? currentLocation ?? null;
    if (coords) {
      setLocation(coords);
      setInitialRegion({...coords, ...REGION_DELTA});
    }
  }, [preselectedLocation, currentLocation, setLocation, setInitialRegion]);

  function onDrag(coordinate) {
    setLocation(coordinate);
  }

  function onSubmit() {
    navigation.navigate(route.params.parent, {location: location});
  }

  if (!initialRegion) {
    return <LoadingIndicator />;
  }

  return (
    <MapContainer>
      <MapView
        style={styles.map}
        provider={PROVIDER_OSMDROID}
        initialRegion={initialRegion}>
        <PinMarker coordinate={initialRegion} onDrag={onDrag} />
      </MapView>
      <MarkerInfo
        title="Koordinaten"
        text={formatLocation(location)}
        icon="send"
        onPress={onSubmit}
      />
    </MapContainer>
  );
}

function formatLocation(location) {
  const lat = formatLatLng(location?.latitude);
  const lng = formatLatLng(location?.longitude);
  return `${lat}, ${lng}`;
}

function formatLatLng(num) {
  if (num === null) {
    return '-';
  }
  return Math.round(num * 10000 + Number.EPSILON) / 10000;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const REGION_DELTA = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};
