import React from 'react';
import {List} from 'react-native-paper';

export default function UserListItem({data}) {
  return <List.Item key={data.id} title={data.name} />;
}
