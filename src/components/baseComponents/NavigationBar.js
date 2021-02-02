import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
//import { Appbar } from 'react-native-paper';

export default function NavigationBar({navigation}) {
  const logout = () => navigation.navigate();
  const goMap = () => navigation.navigate();
  const goHome = () => navigation.navigate();
  const goMyTask = () => navigation.navigate();
  const goNotification = () => navigation.navigate();

  return (
    <Text>Login Screen</Text>
    /*
    <Appbar>
      <Appbar.Action icon="dots-vertical" onPress={logout}/>
      <Appbar.Action icon="dots-vertical" onPress={goMap}/>
      <Appbar.Action icon="dots-vertical" onPress={goHome}/>
      <Appbar.Action icon="dots-vertical" onPress={goMyTask}/>
      <Appbar.Action icon="dots-vertical" onPress={goNotification}/>
    </Appbar>  
    */
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
