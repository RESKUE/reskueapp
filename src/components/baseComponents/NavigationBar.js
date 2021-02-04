import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';

export default function NavigationBar({navigation}) {
  //const {authService} = React.useContext(AuthContext);
  const logout = () => navigation.navigate('CulturalAssetMapScreen');
  //const logout = () => authService.logout();
  const goMap = () =>
    navigation.navigate('StackScreens', {screen: 'CulturalAssetMapScreen'});
  const goHome = () =>
    navigation.navigate('StackScreens', {screen: 'CulturalAssetListScreen'});
  const goMyTask = () =>
    navigation.navigate('StackScreens', {screen: 'MyTaskListScreen'});
  const goNotification = () =>
    navigation.navigate('StackScreens', {screen: 'NotificationListScreen'});

  return (
    //<Text>Login Screen</Text>

    <Appbar style={styles.bottom}>
      <Appbar.Action icon="close-circle-outline" onPress={logout} />
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
