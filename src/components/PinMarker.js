import React from 'react';
import {Marker} from 'react-native-maps-osmdroid';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PinMarker({coordinate, onDrag}) {
  const {colors} = useTheme();

  function onMarkerDrag(event) {
    if (onDrag) {
      onDrag(event.nativeEvent.coordinate);
    }
  }

  return (
    <Marker draggable coordinate={coordinate} onDrag={onMarkerDrag}>
      <Icon name="map-marker" size={40} color={colors.redish} />
    </Marker>
  );
}
