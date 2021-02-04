import React from 'react';
import {List} from 'react-native-paper';

export default function UserListItem({data}) {
  function onPress() {
    console.log('Tapped user', data.id);
  }

  return <List.Item key={data.id} title={data.name} onPress={onPress} />;
}
