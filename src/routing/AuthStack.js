import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
