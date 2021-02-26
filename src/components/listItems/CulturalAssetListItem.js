import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List, useTheme} from 'react-native-paper';

export default function CulturalAssetListItem({data}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const priority = data?.priority;
  const isEndangered = data?.isEndangered ?? false;
  const iconName = getPriorityIcon();
  const iconColor = getIconColor();

  return (
    <List.Item
      key={data.id}
      right={(props) => (
        <List.Icon {...props} icon={iconName} color={iconColor} />
      )}
      title={data.name}
      description={data.description}
      onPress={onPress}
    />
  );

  function onPress() {
    navigation.push('CulturalAssetDetailScreen', {id: data.id});
  }

  function getIconColor() {
    return isEndangered ? colors.redish : colors.primary;
  }

  function getPriorityIcon() {
    if (Number.isInteger(priority) && priority >= 0 && priority <= 9) {
      return `numeric-${priority}-circle`;
    }
    return 'circle';
  }
}
