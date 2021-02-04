import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function HeaderBar({navigation}) {
  const createAlarm = () => navigation.navigate();

  return (
    <Appbar.Header style={styles.head}>
      <Appbar.Content title="RESKUE" />
      <Appbar.Action icon="bell" color="red" onPress={createAlarm} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#FFFFFF',
  },
});
