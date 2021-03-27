describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create, update and delete user Group and users successfully', async () => {
    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Navigate to the user group list screen
    await element(by.text('GRUPPEN')).tap();

    // Navigate to the user group creation screen
    await element(by.id('userListScreenAddButton')).tap();

    // Add a group and users
    await element(by.id('userGroupNameInput')).typeText(
      'User Group test\n',
    );
    await element(by.id('userSelection')).tap();
    await element(by.text('helper')).tap();
    await element(by.id('userSelection')).tap();
    await element(by.text('admin')).tap();
    await element(by.id('userGroupCreationDone')).tap();
    
    // Edit the group
    await element(by.text('User Group test')).tap();
    await element(by.id('userGroupDetailScreenMenuButton')).tap();
    await element(by.id('editButton')).tap();
          // couldn't find how to give the X button a ref to delete a user
    await element(by.id('userGroupCreationDone')).tap(); 


   //Delete the group
    await element(by.text('User Group test')).tap();
    await element(by.id('userGroupDetailScreenMenuButton')).tap();
    await element(by.id('deleteButton')).tap();

    // Check that the asset has been deleted
    await waitFor(element(by.text('User Group test')))
      .not.toBeVisible()
      .withTimeout(5000);

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();
  });
});
