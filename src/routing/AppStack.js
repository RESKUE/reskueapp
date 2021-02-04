import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import CulturalAssetCreationScreen from '../screens/creation/CulturalAssetCreationScreen';
import CulturalAssetDetailScreen from '../screens/detail/CulturalAssetDetailScreen';
import CulturalAssetListScreen from '../screens/list/CulturalAssetListScreen';
import TaskListScreen from '../screens/list/TaskListScreen';
import MyTaskListScreen from '../screens/list/MyTaskListScreen';
import NotificationListScreen from '../screens/list/NotificationListScreen';
import UsergroupListScreen from '../screens/list/UsergroupListScreen';
import CulturalAssetMapScreen from '../screens/map/CulturalAssetMapScreen';
import HeaderBar from '../components/baseComponents/HeaderBar';
import NavigationBar from '../components/baseComponents/NavigationBar';

const Stack = createStackNavigator();
const Swipe = createMaterialTopTabNavigator();
const Bottom = createBottomTabNavigator();

function SwipeScreens() {
  return (
    <Swipe.Navigator initialRouteName="CulturalAsset">
      <Swipe.Screen name="Usergroup" component={UsergroupListScreen} />
      <Swipe.Screen name="CulturalAsset" component={CulturalAssetListScreen} />
      <Swipe.Screen name="Task" component={TaskListScreen} />
    </Swipe.Navigator>
  );
}

export default function AppStack() {
  const {authService} = React.useContext(AuthContext);
  return (
    <Bottom.Navigator
      initialRouteName="StackScreens"
      tabBar={(props) => (
        <NavigationBar authService={authService} {...props} />
      )}>
      <Bottom.Screen name="StackScreens" component={StackScreens} />
    </Bottom.Navigator>
  );
}

function StackScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <HeaderBar {...props} />,
      }}>
      <Stack.Screen name="SwipeScreens" component={SwipeScreens} />
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
