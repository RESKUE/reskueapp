import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CulturalAssetListScreen from '../screens/list/CulturalAssetListScreen';
import CulturalAssetDetailScreen from '../screens/detail/CulturalAssetDetailScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="CulturalAssetListScreen"
        component={CulturalAssetListScreen}
      />
      <Stack.Screen
        name="CulturalAssetDetailScreen"
        component={CulturalAssetDetailScreen}
      />
    </Stack.Navigator>
  );
}
