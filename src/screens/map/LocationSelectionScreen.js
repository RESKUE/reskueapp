import React from 'react';
import {StyleSheet} from 'react-native';
import {LoadingIndicator} from '@ilt-pse/react-native-kueres';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import MapContainer from '../../components/MapContainer';
import PinMarker from '../../components/PinMarker';
import MarkerInfo from '../../components/MarkerInfo';
import useRegion from '../../handlers/RegionHook';

export default function LocationSelectionScreen({navigation, route}) {
  const {region: initialRegion} = useRegion();
  const [location, setLocation] = React.useState(null);

  // Use the coordinate of the initial region as initially selected location
  React.useEffect(() => {
    if (initialRegion) {
      const {latitude, longitude} = initialRegion;
      setLocation({latitude, longitude});
    }
  }, [initialRegion, setLocation]);

  function onDrag(coordinate) {
    setLocation(coordinate);
  }

  function onSubmit() {
    navigation.navigate(route.params.parent, {location: location});
  }

  if (!initialRegion) {
    return <LoadingIndicator />;
  }

  const initialLocation = {
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
  };

  const lat = formatLatLng(location?.latitude ?? initialLocation.latitude);
  const lng = formatLatLng(location?.longitude ?? initialLocation.longitude);

  return (
    <MapContainer>
      <MapView
        style={styles.map}
        provider={PROVIDER_OSMDROID}
        initialRegion={initialRegion}>
        <PinMarker coordinate={initialLocation} onDrag={onDrag} />
      </MapView>
      <MarkerInfo
        title="Koordinaten"
        text={`${lat}, ${lng}`}
        icon="send"
        onPress={onSubmit}
      />
    </MapContainer>
  );
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
