import React from 'react';
import {List} from 'react-native-paper';
import CulturalAsset from '../../models/CulturalAsset';

export default function CulturalAssetSelectionListItem({data, extraData}) {
  const culturalAsset = new CulturalAsset(data);

  function onPress() {
    extraData.callback(culturalAsset.data.id);
  }

  return (
    <List.Item
      key={culturalAsset.data.id}
      title={culturalAsset.data.name}
      description={culturalAsset.data.description}
      onPress={() => onPress()}
    />
  );
}
