import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CulturalAssetListScreen from '../screens/listScreens/CulturalAssetListScreen';
import CulturalAssetDetailScreen from '../screens/detailScreens/CulturalAssetDetailScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
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
