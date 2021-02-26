import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function TaskListItem({data}) {
  const navigation = useNavigation();

  function onPress() {
    navigation.push('TaskDetailScreen', {id: data.id});
  }
  function getBackgroundColor() {
    if (data.isEndangered) {
      return '#a51d01';
    } else {
      return '#ffffff';
    }
  }
  return (
    <List.Item
      style={{backgroundColor: getBackgroundColor()}}
      key={data.id}
      title={data.name}
      description={data.description}
      onPress={onPress}
    />
  );
}
