describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create, update and delete cultural asset successfully', async () => {
    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Navigate to the asset creation screen
    await element(by.id('assetListScreenAddButton')).tap();

    // Enter asset details
    await element(by.id('assetCreationScreenNameInput')).typeText(
      'Louvre Museum\n',
    );
    await element(by.id('assetCreationScreenAddressInput')).typeText(
      'Rue de Rivoli, 75001 Paris, France\n',
    );

    // Scroll to the submit button and tap it
    await waitFor(element(by.id('assetCreationScreenSubmitButton')))
      .toBeVisible()
      .whileElement(by.id('assetCreationScreenScaffold'))
      .scroll(150, 'down');
    await element(by.id('assetCreationScreenSubmitButton')).tap();

    // Wait shortly for the asset to become visible in the asset list
    await waitFor(element(by.text('Louvre Museum')))
      .toBeVisible()
      .withTimeout(5000);

    // Navigate to the assets edit screen
    await element(by.text('Louvre Museum')).tap();
    await element(by.id('assetDetailScreenMenuButton')).tap();
    await element(by.id('assetDetailScreenEditButton')).tap();

    // Add a description to the asset
    await element(by.id('assetCreationScreenDescriptionInput')).typeText(
      'Nice place!\n',
    );

    // Scroll to the submit button and tap it
    await waitFor(element(by.id('assetCreationScreenSubmitButton')))
      .toBeVisible()
      .whileElement(by.id('assetCreationScreenScaffold'))
      .scroll(150, 'down');
    await element(by.id('assetCreationScreenSubmitButton')).tap();

    // Check the description on the asset list screen
    await device.pressBack();
    await waitFor(element(by.text('Nice place!')))
      .toBeVisible()
      .withTimeout(5000);

    // Open and delete the asset
    await element(by.text('Louvre Museum')).tap();
    await element(by.id('assetDetailScreenMenuButton')).tap();
    await element(by.id('assetDetailScreenDeleteButton')).tap();

    // Check that the asset has been deleted
    await waitFor(element(by.text('Louvre Museum')))
      .not.toBeVisible()
      .withTimeout(5000);

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();
  });
});
