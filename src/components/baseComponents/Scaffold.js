import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

export default function Scaffold({children}) {
  return (
    <View style={styles.scaffold}>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scaffold: {
    flex: 1,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    minHeight: '100%',
  },
});
