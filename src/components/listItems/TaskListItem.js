import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {List, useTheme} from 'react-native-paper';

export default function TaskListItem({testID, data}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const backgroundColor = data.isEndangered ? colors.redish : '#ffffff';

  return (
    <List.Item
      style={{backgroundColor: backgroundColor}}
      key={data.id}
      title={data.name}
      description={data.description}
      onPress={onPress}
      testID={testID}
    />
  );

  function onPress() {
    navigation.navigate({
      name: 'TaskDetailScreen',
      key: data.id,
      params: {id: data.id},
    });
  }
}
