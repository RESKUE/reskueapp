import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Scaffold({children}) {
  return <View style={styles.scaffold}>{children}</View>;
}

const styles = StyleSheet.create({
  scaffold: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
});
