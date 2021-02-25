import React from 'react';
import {List} from 'react-native-paper';

export default function NotificationListItem({data, extraData}) {
  return (
    <List.Item
      key={data.id}
      title={data.title}
      description={data.message}
      onPress={() => extraData.onPress(data.id)}
    />
  );
}
