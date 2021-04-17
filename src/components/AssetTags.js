import React from 'react';
import {StyleSheet, View} from 'react-native';
import SmallChip from './SmallChip';
import Priorities from '../models/AssetPriorities';

export default function AssetTags({data}) {
  return (
    <View style={styles.chips}>
      <SmallChip>{getPriorityLabel(data.priority)}</SmallChip>
      <SmallChip>Ebene {data.level}</SmallChip>
      {!!data.label && <SmallChip>{data.label}</SmallChip>}
      {!!data.isEndangered && <SmallChip>In Gefahr!</SmallChip>}
    </View>
  );
}

function getPriorityLabel(priority) {
  try {
    return Priorities[priority].name;
  } catch (e) {
    return 'Unbekannte Priorität';
  }
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginRight: -4,
  },
});
