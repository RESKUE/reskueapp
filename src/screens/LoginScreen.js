import React from 'react';
import {Text, Button} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';

export default function LoginScreen() {
  const {authService} = React.useContext(AuthContext);

  return (
    <>
      <Text>Login Screen</Text>
      <Button mode="contained" onPress={() => authService.login()}>
        Login
      </Button>
    </>
  );
}
