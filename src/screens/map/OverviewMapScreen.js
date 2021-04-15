import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_OSMDROID} from 'react-native-maps-osmdroid';
import {
  SearchBar,
  FilteringButton,
  RadioFilteringOption,
  SearchProvider,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import Priorities from '../../models/AssetPriorities';
import useAssets from '../../handlers/AssetsHook';
import MapContainer from '../../components/MapContainer';
import AssetMarker from '../../components/AssetMarker';
import MarkerInfo from '../../components/MarkerInfo';
import useLocation from '../../handlers/LocationHook';

export default function OverviewMapScreen() {
  const navigation = useNavigation();
  const {location} = useLocation();
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
    navigation.navigate({
      name: 'CulturalAssetDetailScreen',
      key: info.identifier,
      params: {id: info.identifier},
    });
  }

  if (!location) {
    return <LoadingIndicator />;
  }

  const initialRegion = {...location, ...REGION_DELTA};

  return (
    <>
      <MapContainer>
        <MapView
          style={styles.map}
          provider={PROVIDER_OSMDROID}
          initialRegion={initialRegion}
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
                field="level"
                operation="="
                options={[
                  {name: 'Alle', value: null},
                  {name: '0', value: 0},
                  {name: '1', value: 1},
                  {name: '2', value: 2},
                  {name: '3', value: 3},
                ]}
                label="Ebene"
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

const REGION_DELTA = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};
