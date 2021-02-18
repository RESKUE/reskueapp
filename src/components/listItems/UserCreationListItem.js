import React from 'react';
import {useTheme, IconButton, List} from 'react-native-paper';

export default function UserCreationListItem({data, extraData}) {
  const {colors} = useTheme();

  function removeUser() {
    extraData.removeCallback(data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.name}
      right={() => (
        <IconButton icon="close" color={colors.primary} onPress={removeUser} />
      )}
    />
  );
}
