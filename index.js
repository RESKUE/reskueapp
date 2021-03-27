import 'react-native-gesture-handler'; // must be on top to correctly initialize
import {NotificationService, TokenStorage} from '@ilt-pse/react-native-kueres';
import {AppRegistry} from 'react-native';
import Config from 'react-native-config';
import App from './src/App';
import authConfig from './src/models/AuthConfig';

NotificationService.setup({
  baseUrl: Config.APP_REST_BASE_URL,
  authConfig: authConfig,
  tokenStorage: new TokenStorage(),
});

NotificationService.start();

AppRegistry.registerComponent(Config.APP_NAME, () => App);
