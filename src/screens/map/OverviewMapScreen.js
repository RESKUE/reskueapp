import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import useAllAssets from '../../handlers/AllAssetsHook';
import MapContainer from '../../components/MapContainer';
import AssetMarker from '../../components/AssetMarker';
import MarkerInfo from '../../components/MarkerInfo';

export default function OverviewMapScreen() {
  const navigation = useNavigation();
  const {result, requestAllAssets} = useAllAssets();
  const [info, setInfo] = React.useState(null);
  const markers = generateMarkers(result?.data?.content || [], onMarkerPress);

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  function showInfo(title, description, identifier) {
    setInfo({title, description, identifier});
  }

  function hideInfo() {
    setInfo(null);
  }

  function onMarkerPress({title, description, identifier}) {
    showInfo(title, description, identifier);
  }

  function onMapPress() {
    hideInfo();
  }

  function onMore() {
    navigation.push('CulturalAssetDetailScreen', {id: info.identifier});
  }

  return (
    <MapContainer>
      <MapView
        style={styles.map}
        provider={PROVIDER_OSMDROID}
        initialRegion={INITIAL_REGION}
        onPress={onMapPress}>
        {markers}
      </MapView>
      <MarkerInfo
        visible={info !== null}
        title={info?.title}
        text={info?.description}
        onPress={onMore}
        icon="more"
      />
    </MapContainer>
  );
}

function generateMarkers(culturalAssets = [], onMarkerPress) {
  return culturalAssets.map((asset) => {
    if (asset?.latitude === null || asset?.longitude === null) {
      return null;
    }
    return (
      <AssetMarker
        key={asset.id}
        title={asset?.name}
        description={asset?.description}
        identifier={asset.id}
        coordinate={{latitude: asset.latitude, longitude: asset.longitude}}
        onPress={onMarkerPress}
      />
    );
  });
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
