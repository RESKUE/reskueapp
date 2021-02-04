import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function HeaderBar({navigation}) {
  const createAlarm = () => navigation.navigate();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action />
      <Appbar.Content title="RESKUE" style={styles.content} />
      <Appbar.Action icon="bell" color="red" onPress={createAlarm} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
  },
});
