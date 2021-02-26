import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import AlarmAction from '../AlarmAction';

export default function HeaderBar() {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action />
      <Appbar.Content
        title={
          <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        }
        style={styles.content}
      />
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
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    height: 28,
    width: 155,
  },
});
