import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import NotificationListItem from '../../components/listItems/NotificationListItem';

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

const notificationData = [
  {
    id: 1,
    title: 'Waldbrand',
    message: 'Nähe Wildparkstadion, Berufsfeuerwehr unterwegs',
  },
  {
    id: 2,
    title: 'Kernschmelze Campus Nord',
    message: 'Wichtig: Den Studenten nicht frei geben',
  },
];
