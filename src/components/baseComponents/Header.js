import {React} from 'react';
import {Text} from 'react-native';
//import { Appbar } from 'react-native-paper';

export default function Header({navigation}) {
  
  const createAlarm = () => navigation.navigate();

  return (
    <Text>Login Screen</Text>
    
    /*
    <Appbar.Header>
      <Appbar.Content title="RESKUE"/>
      <Appbar.Action icon="dots-vertical" onPress={createAlarm}/>
    </Appbar.Header>
    */
  );
    
}