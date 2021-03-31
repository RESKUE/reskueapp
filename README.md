# RESKUE App

## Initial setup

Follow the React Native development environment [setup guide](https://reactnative.dev/docs/environment-setup).

### NPM registry

One needs to [authenticate with our private Package Registry](https://docs.gitlab.com/ee/user/packages/npm_registry/#authenticate-to-the-package-registry) in order to access its packages. To do so create a private access token with the `api` scope. Then run the following commands after replacing `<your_access_token>` with your private access token:

- `npm config set @ilt-pse:registry https://gitlab-ext.iosb.fraunhofer.de/api/v4/projects/2563/packages/npm/`
- `npm config set '//gitlab-ext.iosb.fraunhofer.de/api/v4/projects/2563/packages/npm/:_authToken' "<your_access_token>"`

### Project dependencies

1. Clone the repository
2. Run `npm i` inside the `reskueapp` folder

## Development

1. Enter the `reskueapp` folder
2. Start an Android emulator / Connect an Android device
3. Run `npm run start` (keep it running)
4. Run `npm run android`

## Tests

### Unit/Itegration/Component Tests

...are automatically run by CI.
You can also manually run these test with `npm run test`.
The test files are located in the `__tests__` directory.

### End to end tests

End-to-end (e2e) tests are not automatically run by CI.
This is due to their non-trivial setup, speed and them being more prone to flakiness.

#### Setup

1. Run the RESKUE Backend in production mode
2. Have `admin` and `helper` users with password `1234`
3. Have a Pixel 3a Android R Emulator with the name `Pixel_3a_API_30_x86`. (alternatively add a new configuration to `.detoxrc.json`)
4. Keep `npm run start` running in a terminal
5. Build a debug test version of the app with `npm run e2e-build-debug`
6. Run the tests with `npm run e2e-test-debug`

## Configuration

The RESKUE app supports multiple configuration environment via [react-native-config](https://github.com/luggit/react-native-config). Environments are configured using `.env` files. Variables placed in `.env` files are accessable from JavaScript, native Android and native iOS files.

By default the `.env` environment for local development with a locally running backend is used. Other environemnts such as the staging environment (`.env.staging`) can be used by setting a `ENVFILE` environment variable. For instance use the following command to run the Android app using the staging environment: `ENVFILE=.env.staging npx react-native run-android` (Linux).
