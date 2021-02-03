import React from 'react';
import {Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default function HeaderBar({navigation}) {
  const createAlarm = () => navigation.navigate();

  return (
    //<Text>Login Screen</Text>

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
