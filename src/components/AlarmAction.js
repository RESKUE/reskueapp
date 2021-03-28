import React from 'react';
import useRoles from '../handlers/RolesHook';
import {useNavigation} from '@react-navigation/native';
import {Appbar, useTheme} from 'react-native-paper';

export default function AlarmAction() {
  const navigation = useNavigation();
  const {isAdmin} = useRoles();
  const {colors} = useTheme();

  if (!isAdmin) {
    // Preserve layout using an invisible placeholder.
    return <Appbar.Action testID="alarmActionBellPlaceholder" />;
  }

  return (
    <Appbar.Action
      icon="bell"
      color={colors.redish}
      onPress={launchNotificationCreation}
      testID="alarmActionBell"
    />
  );

  function launchNotificationCreation() {
    navigation.push('NotificationCreationScreen');
  }
}
