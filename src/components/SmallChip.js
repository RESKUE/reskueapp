import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

export default function SmallChip({style, textStyle, children}) {
  return (
    <Chip style={[styles.chip, style]} textStyle={[styles.chipText, textStyle]}>
      {children}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 4,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12,
    marginVertical: 0,
  },
});
