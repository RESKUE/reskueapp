import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function NavigationBar({authService, navigation}) {
  const logout = () => authService.logout();
  const goMap = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'OverviewMapScreen'}],
    });
  const goHome = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeTabs'}],
    });
  const goMyTask = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'MyTaskListScreen'}],
    });
  const goNotification = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'NotificationListScreen'}],
    });

  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="close-circle-outline"
        onPress={logout}
        testID="navigationBarLogoutButton"
      />
      <Appbar.Action icon="map-outline" onPress={goMap} />
      <Appbar.Action icon="home" onPress={goHome} />
      <Appbar.Action icon="view-list" onPress={goMyTask} />
      <Appbar.Action icon="bell-outline" onPress={goNotification} />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#168A60',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
