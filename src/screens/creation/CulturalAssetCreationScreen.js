import React from 'react';
import {Text} from 'react-native';
import Scaffold from '../../components/baseComponents/Scaffold';

export default function CulturalAssetCreationScreen({navigation, route}) {
  return (
    <Scaffold
      navigation={navigation}
      content={<Text>Here you can create a cultural asset</Text>}
    />
  );
}
