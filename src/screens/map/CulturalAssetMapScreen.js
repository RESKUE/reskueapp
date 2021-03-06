import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import useAsset from '../../handlers/AssetHook';
import MapContainer from '../../components/MapContainer';
import AssetMarker from '../../components/AssetMarker';
import MarkerInfo from '../../components/MarkerInfo';
import {LoadingIndicator, ErrorIndicator} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetMapScreen({route}) {
  const {result, requestAsset} = useAsset();
  const data = result?.data;
  const coordinate = {latitude: data?.latitude, longitude: data?.longitude};
  const region = {...REGION_DELTA, ...coordinate};

  React.useEffect(() => {
    requestAsset(route.params.id);
  }, [requestAsset, route.params.id]);

  if (!result?.data) {
    console.log(result);
    return <LoadingIndicator />;
  }

  if (!coordinate.latitude || !coordinate.longitude) {
    return <ErrorIndicator label="Keine Koordinaten vorhanden!" />;
  }

  return (
    <MapContainer>
      <MapView
        style={styles.map}
        provider={PROVIDER_OSMDROID}
        initialRegion={region}>
        <AssetMarker coordinate={coordinate} />
      </MapView>
      <MarkerInfo title={result.data.name} text={result.data.description} />
    </MapContainer>
  );
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
