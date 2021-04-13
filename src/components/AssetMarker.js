import React from 'react';
import BaseMarker from './BaseMarker';

export default function AssetMarker({
  title,
  description,
  identifier,
  coordinate,
  onPress,
}) {
  function onMarkerPress() {
    if (onPress) {
      onPress({title, description, identifier, coordinate});
    }
  }

  return <BaseMarker coordinate={coordinate} onPress={onMarkerPress} />;
}
