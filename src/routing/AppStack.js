import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import NavigationBar from '../components/baseComponents/NavigationBar';
import ScreenStack from './ScreenStack';

const Bottom = createBottomTabNavigator();

export default function AppStack() {
  const {authService} = React.useContext(AuthContext);

  return (
    <Bottom.Navigator
      initialRouteName="ScreenStack"
      tabBar={(props) => (
        <NavigationBar authService={authService} {...props} />
      )}>
      <Bottom.Screen name="ScreenStack" component={ScreenStack} />
    </Bottom.Navigator>
  );
}
