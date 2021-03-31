import React from 'react';
import {useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CulturalAssetListScreen from '../screens/list/CulturalAssetListScreen';
import TaskListScreen from '../screens/list/TaskListScreen';
import UsergroupListScreen from '../screens/list/UsergroupListScreen';

const Swipe = createMaterialTopTabNavigator();

export default function HomeTabs() {
  const {colors} = useTheme();
  return (
    <Swipe.Navigator
      initialRouteName="CulturalAssetListScreen"
      tabBarOptions={{indicatorStyle: {backgroundColor: colors.primary}}}>
      <Swipe.Screen
        name="UsergroupListScreen"
        component={UsergroupListScreen}
        options={{tabBarLabel: 'Gruppen'}}
      />
      <Swipe.Screen
        name="CulturalAssetListScreen"
        component={CulturalAssetListScreen}
        options={{tabBarLabel: 'Kulturgüter'}}
      />
      <Swipe.Screen
        name="TaskListScreen"
        component={TaskListScreen}
        options={{tabBarLabel: 'Aufgaben'}}
      />
    </Swipe.Navigator>
  );
}
