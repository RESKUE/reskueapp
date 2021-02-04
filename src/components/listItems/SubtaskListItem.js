import React from 'react';
import {List} from 'react-native-paper';

export default function SubtaskListItem({data}) {
  function onPress() {
    console.log('Complete subtask', data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.text}
      description={data.description}
      left={(props) => <List.Icon icon="checkbox-blank-outline" />}
      onPress={onPress}
    />
  );
}
