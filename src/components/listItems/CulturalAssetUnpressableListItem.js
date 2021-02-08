import React from 'react';
import {List} from 'react-native-paper';
import CulturalAsset from '../../models/CulturalAsset';

export default function CulturalAssetUnpressableListItem({data}) {
  const culturalAsset = new CulturalAsset(data);

  return (
    <List.Item
      key={culturalAsset.data.id}
      title={culturalAsset.data.name}
      description={culturalAsset.data.description}
    />
  );
}
