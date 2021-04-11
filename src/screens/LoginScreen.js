import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen() {
  const {colors} = useTheme();
  const {authService} = React.useContext(AuthContext);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  function showSnackbar() {
    setSnackbar(true);
  }

  function hideSnackbar() {
    setSnackbar(false);
  }

  function login() {
    authService.login(username, password).then((success) => {
      if (!success) {
        showSnackbar();
      }
    });
  }

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
        <Surface style={styles.surface}>
          <TextInput
            style={styles.element}
            mode="outlined"
            dense={true}
            value={username}
            onChangeText={setUsername}
            autoCompleteType="username"
            label="Benutzername"
            testID="loginScreenUsernameInput"
          />
          <TextInput
            style={styles.element}
            mode="outlined"
            dense={true}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            textContentType="password"
            label="Passwort"
            testID="loginScreenPasswordInput"
            right={
              <TextInput.Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <Button
            style={styles.element}
            color={colors.primary}
            mode="contained"
            onPress={login}
            testID="loginScreenLoginButton">
            Anmelden
          </Button>
        </Surface>
      </View>
      <Snackbar
        visible={snackbar}
        onDismiss={hideSnackbar}
        action={{label: 'Okay', onPress: hideSnackbar}}>
        Anmeldung fehlgeschlagen
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '70%',
  },
  header: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: '50%',
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  surface: {
    borderRadius: 8,
    elevation: 4,
    margin: 32,
    padding: 6,
  },
  element: {
    margin: 6,
  },
});
