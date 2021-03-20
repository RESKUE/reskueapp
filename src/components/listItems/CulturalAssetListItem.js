import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List, TouchableRipple} from 'react-native-paper';
import AssetTags from '../AssetTags';

export default function CulturalAssetListItem({data}) {
  const navigation = useNavigation();

  return (
    <TouchableRipple key={data.id} onPress={onPress}>
      <View>
        <List.Item title={data.name} description={data.description} />
        <AssetTags data={data} />
      </View>
    </TouchableRipple>
  );

  function onPress() {
    navigation.push('CulturalAssetDetailScreen', {id: data.id});
  }
}
