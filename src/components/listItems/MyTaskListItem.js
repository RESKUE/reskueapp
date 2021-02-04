import React from 'react';
import {List} from 'react-native-paper';

export default function MyTaskListItem({data}) {
  function onPress() {
    console.log('Goto task', data.id);
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
