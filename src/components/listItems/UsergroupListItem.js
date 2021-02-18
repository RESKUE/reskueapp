import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function UsergroupListItem({data}) {
  const navigation = useNavigation();

  function onPress() {
    navigation.push('UsergroupDetailScreen', {id: data.id});
  }

  return (
    <List.Item
      key={data.id}
      title={data.name}
      description={data.description}
      onPress={onPress}
    />
  );
}
