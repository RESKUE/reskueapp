import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function UsergroupListItem({testID, data}) {
  const navigation = useNavigation();

  return (
    <List.Item
      key={data.id}
      title={data.name}
      description={data.description}
      onPress={onPress}
      testID={testID}
    />
  );

  function onPress() {
    navigation.push('UsergroupDetailScreen', {id: data.id});
  }
}
