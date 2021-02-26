import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import AlarmAction from '../AlarmAction';

export default function HeaderBar() {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action disabled={true} />
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <AlarmAction />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 28,
    width: 155,
  },
});
