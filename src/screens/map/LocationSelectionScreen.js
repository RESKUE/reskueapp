import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import MapContainer from '../../components/MapContainer';
import PinMarker from '../../components/PinMarker';
import MarkerInfo from '../../components/MarkerInfo';

export default function LocationSelectionScreen({navigation, route}) {
  const [location, setLocation] = React.useState(INITIAL_COORDINATE);
  const lat = formatLatLng(location?.latitude ?? null);
  const lng = formatLatLng(location?.longitude ?? null);

  function onDrag(coordinate) {
    setLocation(coordinate);
  }

  function onSubmit() {
    const callback = route.params?.callback;
    if (callback) {
      callback(location);
    }
    navigation.goBack();
  }

  return (
    <MapContainer>
      <MapView
        style={styles.map}
        provider={PROVIDER_OSMDROID}
        initialRegion={INITIAL_REGION}>
        <PinMarker coordinate={INITIAL_COORDINATE} onDrag={onDrag} />
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

const INITIAL_REGION = {
  latitude: 48.99897,
  longitude: 8.39991,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const INITIAL_COORDINATE = {latitude: 48.99897, longitude: 8.39991};
