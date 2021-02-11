import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function UserSelectionListItem({data}) {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate('UsergroupCreationScreen', {
      userId: data.id,
    });
  }

  return <List.Item key={data.id} title={data.name} onPress={onPress} />;
}
