import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List, TouchableRipple, useTheme} from 'react-native-paper';
import AssetTags from '../AssetTags';

export default function CulturalAssetListItem({testID, data}) {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <TouchableRipple testID={testID} key={data.id} onPress={onPress}>
      <View>
        <List.Item
          title={data.name}
          description={data.description}
          right={getIcon}
        />
        <AssetTags data={data} />
      </View>
    </TouchableRipple>
  );

  function getIcon(props) {
    if (!data.isEndangered) {
      return null;
    }
    return <List.Icon {...props} icon="alert" color={colors.redish} />;
  }

  function onPress() {
    navigation.navigate({
      name: 'CulturalAssetDetailScreen',
      key: data.id,
      params: {id: data.id},
    });
  }
}
