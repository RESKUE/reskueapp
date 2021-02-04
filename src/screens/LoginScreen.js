import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen() {
  const {authService} = React.useContext(AuthContext);

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/logo.png')}
        />
      </View>
      <LinearGradient colors={['#00a569', '#18895e']} style={styles.footer} />
      <View style={styles.center}>
        <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          mode="contained"
          onPress={() => authService.login()}>
          Anmelden
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {height: '50%', justifyContent: 'center', alignItems: 'center'},
  footer: {height: '50%'},
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {width: '60%'},
  buttonLabel: {fontSize: 16},
  buttonContent: {height: 50, backgroundColor: '#2ed296'},
  logo: {width: '70%'},
});
