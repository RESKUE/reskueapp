import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from './HeaderBar';
import {NavigationBar} from './NavigationBar';

export default function Scaffold({navigation}) {
  return (
    <View>
      <HeaderBar navigation={navigation} />
      <View>
        <Text>Scaffold</Text>
      </View>
      <NavigationBar navigation={navigation} />
    </View>
  );
}
