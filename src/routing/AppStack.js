import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CulturalAssetCreationScreen from '../screens/creation/CulturalAssetCreationScreen';
import CulturalAssetDetailScreen from '../screens/detail/CulturalAssetDetailScreen';
import CulturalAssetListScreen from '../screens/list/CulturalAssetListScreen';
import MyTaskListScreen from '../screens/list/MyTaskListScreen';
import NotificationListScreen from '../screens/list/NotificationListScreen';
import CulturalAssetMapScreen from '../screens/map/CulturalAssetMapScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CulturalAssetListScreen"
        component={CulturalAssetListScreen}
      />
      <Stack.Screen
        name="CulturalAssetDetailScreen"
        component={CulturalAssetDetailScreen}
      />
      <Stack.Screen
        name="CulturalAssetCreationScreen"
        component={CulturalAssetCreationScreen}
      />
      <Stack.Screen
        name="CulturalAssetMapScreen"
        component={CulturalAssetMapScreen}
      />
      <Stack.Screen name="MyTaskListScreen" component={MyTaskListScreen} />
      <Stack.Screen
        name="NotificationListScreen"
        component={NotificationListScreen}
      />
    </Stack.Navigator>
  );
}
