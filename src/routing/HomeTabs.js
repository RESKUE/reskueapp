import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CulturalAssetListScreen from '../screens/list/CulturalAssetListScreen';
import TaskListScreen from '../screens/list/TaskListScreen';
import UsergroupListScreen from '../screens/list/UsergroupListScreen';

const Swipe = createMaterialTopTabNavigator();

export default function HomeTabs() {
  return (
    <Swipe.Navigator initialRouteName="CulturalAssetListScreen">
      <Swipe.Screen
        name="UsergroupListScreen"
        component={UsergroupListScreen}
        options={{tabBarLabel: 'Usergroup'}}
      />
      <Swipe.Screen
        name="CulturalAssetListScreen"
        component={CulturalAssetListScreen}
        options={{tabBarLabel: 'CulturalAsset'}}
      />
      <Swipe.Screen
        name="TaskListScreen"
        component={TaskListScreen}
        options={{tabBarLabel: 'Usergroup'}}
      />
    </Swipe.Navigator>
  );
}
