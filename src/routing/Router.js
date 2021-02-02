import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function Router() {
  const {authStatus} = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {authStatus ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
