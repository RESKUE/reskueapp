import React from 'react';
import {List} from 'react-native-paper';

export default function NotificationListItem({data}) {
  function onPress() {
    console.log('Goto notification', data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.title}
      description={data.message}
      onPress={onPress}
    />
  );
}
