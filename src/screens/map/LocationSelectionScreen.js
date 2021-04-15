import React from 'react';
import {StyleSheet} from 'react-native';
import {LoadingIndicator} from '@ilt-pse/react-native-kueres';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import MapContainer from '../../components/MapContainer';
import PinMarker from '../../components/PinMarker';
import MarkerInfo from '../../components/MarkerInfo';
import useRegion from '../../handlers/RegionHook';

export default function LocationSelectionScreen({navigation, route}) {
  const {region: currentRegion} = useRegion();
  const [location, setLocation] = React.useState(null);
  const [initialRegion, setInitialRegion] = React.useState(null);
  const preselectedLocation = route.params?.location ?? null;

  React.useEffect(() => {
    if (preselectedLocation) {
      setLocation(preselectedLocation);
      setInitialRegion({...preselectedLocation, ...DELTA});
    } else if (currentRegion) {
      const {latitude, longitude} = currentRegion;
      const coords = {latitude, longitude};
      setLocation(coords);
      setInitialRegion(currentRegion);
    }
  }, [preselectedLocation, currentRegion, setLocation, setInitialRegion]);

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

const DELTA = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};
