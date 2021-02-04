import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ListActions({children}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'flex-end'},
});
