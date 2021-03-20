import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {Priorities} from '../models/CulturalAsset';

export default function AssetTags({data}) {
  return (
    <View style={styles.chips}>
      <SmallChip>{getPriorityLabel(data.priority)}</SmallChip>
      <SmallChip>Ebene {data.level}</SmallChip>
      {data.label && <SmallChip>{data.label}</SmallChip>}
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

function SmallChip({style, textStyle, children}) {
  return (
    <Chip style={[styles.chip, style]} textStyle={[styles.chipText, textStyle]}>
      {children}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginRight: -4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    marginVertical: 0,
  },
});
