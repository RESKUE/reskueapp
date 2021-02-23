import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import useAsset from '../../handlers/IdAssetHook';
import MapContainer from '../../components/MapContainer';
import AssetMarker from '../../components/AssetMarker';
import MarkerInfo from '../../components/MarkerInfo';
import {LoadingIndicator, ErrorIndicator} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetMapScreen({route}) {
  const {result, requestAsset} = useAsset(route.params.id);
  const data = result?.data;
  const coordinate = {latitude: data?.latitude, longitude: data?.longitude};
  const region = {latitudeDelta: 0.09, longitudeDelta: 0.04, ...coordinate};

  React.useEffect(() => {
    requestAsset();
  }, [requestAsset]);

  if (!result?.data) {
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
