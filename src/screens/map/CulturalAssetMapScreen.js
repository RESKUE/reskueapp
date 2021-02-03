import React from 'react';
import {Text} from 'react-native';
import Scaffold from '../../components/baseComponents/Scaffold';

export default function CulturalAssetMapScreen({navigation}) {
  return (
    <Scaffold
      navigation={navigation}
      content={<Text>Here you can see all cultural assets on a map</Text>}
    />
  );
}
