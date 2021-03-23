import React from 'react';
import {useTheme, IconButton, List} from 'react-native-paper';
import CulturalAsset from '../../models/CulturalAsset';

export default function CulturalAssetCreationListItem({data, extraData}) {
  const {colors} = useTheme();
  const culturalAsset = new CulturalAsset(data);

  function removeCulturalAsset() {
    extraData.removeCallback();
  }

  return (
    <List.Item
      key={culturalAsset.data.id}
      title={culturalAsset.data.name}
      description={culturalAsset.data.description}
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
