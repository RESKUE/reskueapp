import React from 'react';
import {useTheme, IconButton, List} from 'react-native-paper';

export default function CulturalAssetCreationListItem({data, extraData}) {
  const {colors} = useTheme();

  function removeCulturalAsset() {
    extraData.removeCallback();
  }

  return (
    <List.Item
      key={data.id}
      title={data.name}
      description={data.description}
      right={() => (
        <IconButton
          testID="removeAssetIconButton"
          icon="close"
          color={colors.primary}
          onPress={removeCulturalAsset}
        />
      )}
    />
  );
}
