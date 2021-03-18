import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import {
  SearchBar,
  FilteringButton,
  RadioFilteringOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';
import {Priorities} from '../../models/CulturalAsset';
import useAssets from '../../handlers/AssetsHook';
import MapContainer from '../../components/MapContainer';
import AssetMarker from '../../components/AssetMarker';
import MarkerInfo from '../../components/MarkerInfo';

export default function OverviewMapScreen() {
  const navigation = useNavigation();
  const {result, setQuery, requestAssets} = useAssets();
  const [info, setInfo] = React.useState(null);
  const markers = generateMarkers(result?.data?.content || [], onMarkerPress);

  React.useEffect(() => {
    requestAssets();
  }, [requestAssets]);

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
    <>
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
      <View style={styles.overlay}>
        <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
          <SearchBar field="name" operation="~">
            <FilteringButton>
              <RadioFilteringOption
                field="isEndangered"
                operation="="
                options={[
                  {name: 'Egal', value: null},
                  {name: 'Nein', value: 0},
                  {name: 'Ja', value: 1},
                ]}
                label="In Gefahr"
              />
              <RadioFilteringOption
                field="priority"
                operation="="
                options={[{name: 'Alle', value: null}].concat(Priorities)}
                label="Priorität"
              />
            </FilteringButton>
          </SearchBar>
        </SearchProvider>
      </View>
    </>
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
  overlay: {
    position: 'absolute',
    padding: 16,
    width: '100%',
  },
});

const INITIAL_REGION = {
  latitude: 48.99897,
  longitude: 8.39991,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
