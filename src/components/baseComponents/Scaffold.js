import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

export default function Scaffold({children}) {
  return (
    <View style={styles.scaffold}>
      <ScrollView style={styles.content}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scaffold: {},
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});
