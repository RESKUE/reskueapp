import React from 'react';
import BaseMarker from './BaseMarker';

export default function PinMarker({coordinate, onDrag}) {
  function onMarkerDrag(event) {
    if (onDrag) {
      onDrag(event.nativeEvent.coordinate);
    }
  }

  return <BaseMarker draggable coordinate={coordinate} onDrag={onMarkerDrag} />;
}
