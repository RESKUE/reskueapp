import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CulturalAssetCreationScreen from '../screens/creation/CulturalAssetCreationScreen';
import TaskCreationScreen from '../screens/creation/TaskCreationScreen';
import UsergroupCreationScreen from '../screens/creation/UsergroupCreationScreen';
import CulturalAssetDetailScreen from '../screens/detail/CulturalAssetDetailScreen';
import MyTaskListScreen from '../screens/list/MyTaskListScreen';
import NotificationListScreen from '../screens/list/NotificationListScreen';
import CulturalAssetSelectionListScreen from '../screens/list/CulturalAssetSelectionListScreen';
import CulturalAssetMapScreen from '../screens/map/CulturalAssetMapScreen';
import MediaDetailScreen from '../screens/detail/MediaDetailScreen';
import HeaderBar from '../components/baseComponents/HeaderBar';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

export default function ScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        header: (props) => <HeaderBar {...props} />,
      }}
      headerMode="float">
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen
        name="UsergroupCreationScreen"
        component={UsergroupCreationScreen}
      />
      <Stack.Screen
        name="CulturalAssetDetailScreen"
        component={CulturalAssetDetailScreen}
      />
      <Stack.Screen name="TaskCreationScreen" component={TaskCreationScreen} />
      <Stack.Screen
        name="CulturalAssetCreationScreen"
        component={CulturalAssetCreationScreen}
      />
      <Stack.Screen
        name="CulturalAssetSelectionListScreen"
        component={CulturalAssetSelectionListScreen}
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
      <Stack.Screen name="MediaDetailScreen" component={MediaDetailScreen} />
    </Stack.Navigator>
  );
}
