import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List, TouchableRipple, useTheme} from 'react-native-paper';

export default function TaskListItem({testID, data}) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableRipple testID={testID} key={data.id} onPress={onPress}>
      <View>
        <List.Item
          title={data.name}
          description={data.description}
          right={getIcon}
        />
      </View>
    </TouchableRipple>
  );

  function getIcon(props) {
    if (!data.isEndangered) {
      return null;
    }
    return <List.Icon {...props} icon="alert" color={colors.redish} />;
  }

  function onPress() {
    navigation.navigate({
      name: 'TaskDetailScreen',
      key: data.id,
      params: {id: data.id},
    });
  }
}
