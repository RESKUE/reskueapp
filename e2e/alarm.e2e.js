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

    // Navigate to the task list screen
    await element(by.text('AUFGABEN')).tap();

    // Navigate to the task creation screen
    await element(by.id('TaskListScreenAddButton')).tap();

    // Add a task and subtask
    await element(by.id('taskCreationNameInput')).typeText('Task test\n');
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
    await element(by.id('userGroupNameInput')).typeText('User Group test\n');
    await element(by.id('userSelection')).tap();
    await element(by.text('helper')).tap();
    await element(by.id('userGroupCreationDone')).tap();

    //set alarm
    await element(by.id('alarmActionBell')).tap();
    await element(by.id('alarmTitelInput')).typeText('Alarm\n');
    await element(by.id('alarmMessageInput')).typeText('This is an alarm\n');
    await element(by.id('selectUserGroupButton')).tap();
    await element(by.id('groupCheckbox')).tap();
    await element(by.id('groupSelectionDone')).tap();

    await element(by.id('selectAssetButton')).tap();
    await element(by.text('Mona Lisa')).tap();

    await element(by.id('setAlarmButton')).tap();

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();

    // Login as helper
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('helper\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    // Navigate to the notification screen
    await element(by.id('navigationBarNotficationButton')).tap();

    //Select the message
    await element(by.text('Alarm')).tap();

    //Navigate to the endangered asset and start working on task
    await element(by.id('goToAssetButton')).tap();
    await element(by.text('Task test')).tap();
    await element(by.id('startTaskButton')).tap();
    // TODO : check subtask
    await element(by.id('goToCommentButton')).tap();
    await expect(element(by.id('commentInput'))).toBeVisible();
    await element(by.id('commentInput')).typeText('wake up it is a dream\n');
    await element(by.id('send')).tap();
    await device.pressBack();
    // TODO : id become finishTaskButton if the previous TODO is done
    await element(by.id('cancelTaskButton')).tap();
    await device.pressBack();

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

    // Check that the asset has been deleted
    await waitFor(element(by.text('Mona Lisa')))
      .not.toBeVisible()
      .withTimeout(5000);

    //Delete the task
    await element(by.text('AUFGABEN')).tap();
    await element(by.text('Task test')).tap();
    await element(by.id('TaskDetailScreenMenuButton')).tap();
    await element(by.id('TaskDeleteButton')).tap();

    // Check that the task has been deleted
    await waitFor(element(by.text('Task test')))
      .not.toBeVisible()
      .withTimeout(5000);

    //Delete the user group
    await element(by.text('GRUPPEN')).tap();
    await element(by.text('User Group test')).tap();
    await element(by.id('userGroupDetailScreenMenuButton')).tap();
    await element(by.id('deleteButton')).tap();

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();
  });
});
