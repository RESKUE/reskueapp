import 'react-native-gesture-handler'; // must be on top to correctly initialize
import {NotificationService, TokenStorage} from '@ilt-pse/react-native-kueres';
import {AppRegistry} from 'react-native';
import App from './src/App';
import appConfig from './app.json';

NotificationService.register(
  appConfig.rest.baseUrl + '/notifications',
  appConfig.auth,
  new TokenStorage(),
);

AppRegistry.registerComponent(appConfig.name, () => App);
