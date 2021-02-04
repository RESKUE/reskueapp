import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import NotificationListItem from '../../components/listItems/NotificationListItem';
import {notificationData} from '../../../testdata';

export default function NotificationListScreen({navigation}) {
  return (
    <Scaffold>
      <FancyList
        title="Benachrichtigungen"
        data={notificationData}
        component={NotificationListItem}
      />
    </Scaffold>
  );
}
