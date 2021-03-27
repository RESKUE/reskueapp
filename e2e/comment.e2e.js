describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create cultural asset, comment it as helper and delete it successfully', async () => {
    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Navigate to the asset creation screen
    await element(by.id('assetListScreenAddButton')).tap();

    // Enter asset details
    await element(by.id('assetCreationScreenNameInput')).typeText(
      'Mona Lisa\n',
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
    await waitFor(element(by.text('Mona Lisa')))
      .toBeVisible()
      .withTimeout(5000);

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();

    // Login as helper
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('helper\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Wait shortly for the asset to become visible in the asset list
    await waitFor(element(by.text('Mona Lisa')))
      .toBeVisible()
      .withTimeout(5000);

    // Navigate to the assets comment screen
    await element(by.text('Mona Lisa')).tap();
    await waitFor(element(by.text('Mona Lisa')))
      .toBeVisible()
      .whileElement(by.id('assetDetailScreenScaffold'))
      .scroll(150, 'down');
    await element(by.id('commentButton')).tap();
    await expect(element(by.id('commentInput'))).toBeVisible();
    await element(by.id('commentInput')).typeText('this is a test\n');
    await element(by.id('send')).tap();

    // Wait shortly for the comment to become visible in the comment list
    await waitFor(element(by.text('this is a test')))
      .toBeVisible()
      .withTimeout(5000);

    // select and delete the comment
    await element(by.text('this is a test')).tap();
    await element(by.text('Delete')).tap();

    // Check that the comment has been deleted
    await waitFor(element(by.text('this is a test')))
      .not.toBeVisible()
      .withTimeout(5000);

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();

    //Clean up

    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Open and delete the asset
    await element(by.text('Mona Lisa')).tap();
    await element(by.id('assetDetailScreenMenuButton')).tap();
    await element(by.id('assetDetailScreenDeleteButton')).tap();

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();


    
  });
});
