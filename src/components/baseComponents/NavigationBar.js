import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function NavigationBar({authService, navigation}) {
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="close-circle-outline"
        onPress={logout}
        testID="navigationBarLogoutButton"
      />
      <Appbar.Action
        icon="map-outline"
        onPress={openMap}
        testID="navigationBarMapButton"
      />
      <Appbar.Action
        icon="home"
        onPress={openHome}
        testID="navigationBarHomeButton"
      />
      <Appbar.Action
        icon="view-list"
        onPress={openMyTasks}
        testID="navigationBarTasksButton"
      />
      <Appbar.Action
        icon="bell-outline"
        onPress={openNotifications}
        testID="navigationBarNotificationsButton"
      />
    </Appbar>
  );

  function logout() {
    authService.logout();
  }

  function openMap() {
    navigation.reset({
      index: 0,
      routes: [{name: 'OverviewMapScreen'}],
    });
  }

  function openHome() {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeTabs'}],
    });
  }

  function openMyTasks() {
    navigation.reset({
      index: 0,
      routes: [{name: 'MyTaskListScreen'}],
    });
  }

  function openNotifications() {
    navigation.reset({
      index: 0,
      routes: [{name: 'NotificationListScreen'}],
    });
  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#168A60',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
