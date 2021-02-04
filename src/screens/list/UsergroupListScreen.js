import React from 'react';
import {Text} from 'react-native';
import Scaffold from '../../components/baseComponents/Scaffold';

export default function UsergroupListScreen({navigation}) {
  return (
    <Scaffold
      navigation={navigation}
      content={
        <>
          <Text>Hier stehen alle Benutzergruppen</Text>
        </>
      }
    />
  );
}
