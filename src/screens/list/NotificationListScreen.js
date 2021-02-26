import React from 'react';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import NotificationListItem from '../../components/listItems/NotificationListItem';
import useNotifications from '../../handlers/NotificationsHook';
import {useFocusEffect} from '@react-navigation/native';

export default function NotificationListScreen({navigation}) {
  const {result, get} = useNotifications();

  useFocusEffect(
    React.useCallback(() => {
      get();
    }, [get]),
  );

  if (result === null) {
    <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <FancyList
        title="Benachrichtigungen"
        data={result?.data?.content ?? []}
        extraData={{onPress: onPress}}
        component={NotificationListItem}
      />
    </Scaffold>
  );

  function onPress(id) {
    navigation.push('NotificationDetailScreen', {id: id});
  }
}
