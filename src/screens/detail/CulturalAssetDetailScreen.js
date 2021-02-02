import React from 'react';
import {Text} from 'react-native';

export default function CulturalAssetDetailScreen({route}) {
  return <Text>Cultural Asset Detail Screen for id: {route.params.id}</Text>;
}
