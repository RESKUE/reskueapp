import 'react-native-gesture-handler'; // must be on top to correctly initialize
import {NotificationService, TokenStorage} from '@ilt-pse/react-native-kueres';
import {AppRegistry} from 'react-native';
import App from './src/App';
import appConfig from './app.json';

NotificationService.setup({
  baseUrl: appConfig.rest.baseUrl,
  authConfig: appConfig.auth,
  tokenStorage: new TokenStorage(),
});

NotificationService.start();

AppRegistry.registerComponent(appConfig.name, () => App);
