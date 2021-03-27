describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create asset, task and user group and set an alarm successfully', async () => {
    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    //Create an asset, task and usergroup to set alarm

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

    // Navigate to the user group list screen
    await element(by.text('AUFGABEN')).tap();

    // Navigate to the asset creation screen
    await element(by.id('TaskListScreenAddButton')).tap();

    // Add a task and subtask
    await element(by.id('taskCreationNameInput')).typeText(
      'Task test\n',
    );
    await element(by.id('assetSelectionButton')).tap();
    await element(by.text('Mona Lisa')).tap();

    // Wait shortly for the asset to become visible in the asset list
    await waitFor(element(by.text('Mona Lisa')))
      .toBeVisible()
      .withTimeout(5000);
    
    await element(by.id('addSubTaskButton')).tap();
    await element(by.id('subTaskInput')).typeText('help\n');
    await element(by.id('creationDoneButton')).tap();

    // Navigate to the user group list screen
    await element(by.text('GRUPPEN')).tap();

    // Navigate to the user group creation screen
    await element(by.id('userListScreenAddButton')).tap();
   
    // Add a group and user
    await element(by.id('userGroupNameInput')).typeText(
      'User Group test\n',
    );
    await element(by.id('userSelection')).tap();
    await element(by.text('helper')).tap();
    await element(by.id('userGroupCreationDone')).tap();

    //set alarm
    await element(by.id('alarmActionBell')).tap();
    await element(by.id('alarmTitelInput')).typeText(
      'Alarm\n',
    );
    await element(by.id('alarmMessageInput')).typeText(
      'This is an alarm\n',
    );
    await element(by.id('selectUserGroupButton')).tap();
    await element(by.id('groupCheckbox')).tap();
    await element(by.id('groupSelectionDone')).tap();

    await element(by.id('selectAssetButton')).tap();
    await element(by.text('Mona Lisa')).tap();

    await element(by.id('setAlarmButton')).tap();
    
    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();
  });
});
