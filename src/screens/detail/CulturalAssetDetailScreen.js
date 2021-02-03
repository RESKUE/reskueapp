import React from 'react';
import {Text} from 'react-native';
import Scaffold from '../../components/baseComponents/Scaffold';

export default function CulturalAssetDetailScreen({navigation, route}) {
  return (
    <Scaffold
      navigation={navigation}
      content={
        <Text>Cultural Asset Detail Screen for id: {route.params.id}</Text>
      }
    />
  );
}
