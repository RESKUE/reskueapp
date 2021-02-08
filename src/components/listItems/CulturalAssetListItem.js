import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
import CulturalAsset from '../../models/CulturalAsset';

export default function CulturalAssetListItem({data}) {
  const navigation = useNavigation();
  const culturalAsset = new CulturalAsset(data);

  function onPress() {
    navigation.push('CulturalAssetDetailScreen', {id: culturalAsset.data.id});
  }

  return (
    <List.Item
      key={culturalAsset.data.id}
      title={culturalAsset.data.name}
      description={culturalAsset.data.description}
      onPress={onPress}
    />
  );
}
