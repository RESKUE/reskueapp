# RESKUE App

## Initial setup

### Android environment

1. [Install NodeJS and NPM](https://nodejs.org/en/download/package-manager/)
2. [Install Android Studio](https://developer.android.com/studio/install)
3. Install the `Android 10 (Q)` SDK
4. Configure the `ANDROID_HOME` environemnt variable

### NPM registry

One needs to [authenticate with our private Package Registry](https://docs.gitlab.com/ee/user/packages/npm_registry/#authenticate-to-the-package-registry) in order to access its packages. To do so create a private access token with the `api` scope. Then run the following commands after replacing `<your_access_token>` with your private access token:

- `npm config set @ilt-pse:registry https://gitlab-ext.iosb.fraunhofer.de/api/v4/projects/2563/packages/npm/`
- `npm config set '//gitlab-ext.iosb.fraunhofer.de/api/v4/packages/npm/:_authToken' "<your_access_token>"`

### The actual project

1. Clone the repository
2. Run `npm i` inside the `reskueapp` folder

## Development

1. Enter the `reskueapp` folder
2. Start an Android emulator / Connect an Android device
3. Run `npm run start` (keep it running)
4. Run `npm run android`
