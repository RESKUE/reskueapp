import Config from 'react-native-config';

export default {
  tokenEndpoint: Config.APP_AUTH_TOKEN_ENDPOINT,
  endSessionEndpoint: Config.APP_AUTH_END_SESSION_ENDPOINT,
  scope: Config.APP_AUTH_SCOPE,
  clientId: Config.APP_AUTH_CLIENT_ID,
};
