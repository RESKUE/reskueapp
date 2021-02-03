import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';

export default function NavigationBar({navigation}) {
  const {authService} = React.useContext(AuthContext);

  const logout = () => authService.logout();
  const goMap = () => navigation.navigate('CulturalAssetMapScreen');
  const goHome = () => navigation.navigate('CulturalAssetListScreen');
  const goMyTask = () => navigation.navigate('MyTaskListScreen');
  const goNotification = () => navigation.navigate('NotificationListScreen');

  return (
    //<Text>Login Screen</Text>

    <Appbar style={styles.bottom}>
      <Appbar.Action icon="dots-vertical" onPress={logout} />
      <Appbar.Action icon="dots-vertical" onPress={goMap} />
      <Appbar.Action icon="dots-vertical" onPress={goHome} />
      <Appbar.Action icon="dots-vertical" onPress={goMyTask} />
      <Appbar.Action icon="dots-vertical" onPress={goNotification} />
    </Appbar>
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
