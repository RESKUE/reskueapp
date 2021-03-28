import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import NavigationBar from '../src/components/baseComponents/NavigationBar';

test('navigation bar renders correctly', () => {
  render(<NavigationBar />);
});

test('navigation bar logout', () => {
  const authService = {logout: jest.fn()};
  const {getByTestId} = render(<NavigationBar authService={authService} />);
  fireEvent.press(getByTestId('navigationBarLogoutButton'));
  expect(authService.logout.mock.calls.length).toBe(1);
});

test('navigation bar map opening', () => {
  const navigation = {reset: jest.fn()};
  const {getByTestId} = render(<NavigationBar navigation={navigation} />);
  fireEvent.press(getByTestId('navigationBarMapButton'));
  expect(navigation.reset.mock.calls.length).toBe(1);
});

test('navigation bar home opening', () => {
  const navigation = {reset: jest.fn()};
  const {getByTestId} = render(<NavigationBar navigation={navigation} />);
  fireEvent.press(getByTestId('navigationBarHomeButton'));
  expect(navigation.reset.mock.calls.length).toBe(1);
});

test('navigation bar task opening', () => {
  const navigation = {reset: jest.fn()};
  const {getByTestId} = render(<NavigationBar navigation={navigation} />);
  fireEvent.press(getByTestId('navigationBarTasksButton'));
  expect(navigation.reset.mock.calls.length).toBe(1);
});

test('navigation bar notification opening', () => {
  const navigation = {reset: jest.fn()};
  const {getByTestId} = render(<NavigationBar navigation={navigation} />);
  fireEvent.press(getByTestId('navigationBarNotificationsButton'));
  expect(navigation.reset.mock.calls.length).toBe(1);
});
