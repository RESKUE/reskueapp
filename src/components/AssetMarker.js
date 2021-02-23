import React from 'react';
import {Marker} from 'react-native-maps-osmdroid';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AssetMarker({
  title,
  description,
  identifier,
  coordinate,
  onPress,
}) {
  const {colors} = useTheme();

  function onMarkerPress() {
    onPress({title, description, identifier, coordinate});
  }

  return (
    <Marker coordinate={coordinate} onPress={onMarkerPress}>
      <Icon name="map-marker" size={40} color={colors.redish} />
    </Marker>
  );
}
