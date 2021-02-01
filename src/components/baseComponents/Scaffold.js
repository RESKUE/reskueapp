import {React} from 'react';
import {Text} from 'react-native';
import {Header} from './Header'
import {NavigationBar} from './NavigationBar'

export default function Scaffold({navigation}) {
  return (
    <View>
      <Header navigation={navigation}/>
      <View>
        <Text>Scaffold</Text>
      </View>
      <NavigationBar navigation={navigation}/>
    </View>
    
  );
  
}
