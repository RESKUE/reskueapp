import mockReactNativeReanimated from 'react-native-reanimated/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-reanimated', () => mockReactNativeReanimated);
jest.mock('react-native-tab-view', () => {
  return {Pager: {}, TabView: {}};
});
