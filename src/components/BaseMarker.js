import React from 'react';
import {Marker} from 'react-native-maps-osmdroid';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BaseMarker(props) {
  const {colors} = useTheme();

  return (
    <Marker {...props}>
      <Icon name="map-marker" size={54} color={colors.redish} />
    </Marker>
  );
}
