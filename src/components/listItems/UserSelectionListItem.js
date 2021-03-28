import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';

export default function UserSelectionListItem({testID, data}) {
  const navigation = useNavigation();

  return (
    <List.Item
      testID={testID}
      key={data.id}
      title={data.name}
      onPress={onPress}
    />
  );

  function onPress() {
    navigation.navigate('UsergroupCreationScreen', {
      userId: data.id,
    });
  }
}
