import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function TaskListItem({data}) {
  const navigation = useNavigation();

  function onPress() {
    navigation.push('TaskDetailScreen', {id: data.id});
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
