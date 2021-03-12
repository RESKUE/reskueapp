import React from "react";
import mockReactNativeReanimated from 'react-native-reanimated/mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-reanimated', () => mockReactNativeReanimated);
jest.mock('react-native-tab-view', () => {
  return {Pager: {}, TabView: {}};
});

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: () => jest.fn(),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock("@react-navigation/material-top-tabs", () => {
  const actual = jest.requireActual("@react-navigation/material-top-tabs");
  return {
    ...actual,
    createMaterialTopTabNavigator: jest.fn().mockReturnValue({
      Navigator: ({children}) => <>{children}</>,
      Screen: ({children}) => <>{children}</>,
    }),
  }
});