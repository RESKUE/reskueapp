describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login admin successfully', async () => {
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();

    await element(by.id("loginScreenUsernameInput")).typeText("admin");
    await element(by.id("loginScreenPasswordInput")).typeText("1234");
    await element(by.id("loginScreenLoginButton")).tap();

    await expect(element(by.id('alarmActionBell'))).toBeVisible();
    await element(by.id("navigationBarLogoutButton")).tap();
  });

  it('should login helper successfully', async () => {
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();

    await element(by.id("loginScreenUsernameInput")).typeText("helper");
    await element(by.id("loginScreenPasswordInput")).typeText("1234");
    await element(by.id("loginScreenLoginButton")).tap();

    await expect(element(by.text('Kulturgüter'))).toBeVisible();
    await element(by.id("navigationBarLogoutButton")).tap();
  });
});
