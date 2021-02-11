import React from 'react';
import {useTheme, IconButton, List} from 'react-native-paper';

export default function UserEditableListItem({data}) {
  const {colors} = useTheme();
  function onPress() {
    console.log('Remove user', data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.name}
      right={() => (
        <IconButton icon="close" color={colors.primary} onPress={onPress} />
      )}
    />
  );
}
