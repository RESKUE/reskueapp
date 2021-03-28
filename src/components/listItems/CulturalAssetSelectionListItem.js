import React from 'react';
import {List} from 'react-native-paper';

export default function CulturalAssetSelectionListItem({data, extraData}) {
  function onPress() {
    extraData.callback(data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.name}
      description={data.description}
      onPress={() => onPress()}
    />
  );
}
