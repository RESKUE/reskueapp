import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';

export default function Scaffold({navigation, content}) {
  return (
    <View style={styles.container}>
      <View>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
