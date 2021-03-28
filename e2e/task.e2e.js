describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create, update and delete task and subtask successfully', async () => {
    // Login as admin
    await expect(element(by.id('loginScreenUsernameInput'))).toBeVisible();
    await element(by.id('loginScreenUsernameInput')).typeText('admin\n');
    await element(by.id('loginScreenPasswordInput')).typeText('1234\n');
    await element(by.id('loginScreenLoginButton')).tap();

    //Create an asset to link it with the task

    // Navigate to the asset creation screen
    await element(by.id('assetListScreenAddButton')).tap();

    // Enter asset details
    await element(by.id('assetCreationScreenNameInput')).typeText(
      'test asset\n',
    );
    await element(by.id('assetCreationScreenAddressInput')).typeText(
      'test adress\n',
    );

    // Scroll to the submit button and tap it
    await waitFor(element(by.id('assetCreationScreenSubmitButton')))
      .toBeVisible()
      .whileElement(by.id('assetCreationScreenScaffold'))
      .scroll(150, 'down');
    await element(by.id('assetCreationScreenSubmitButton')).tap();

    // Wait shortly for the asset to become visible in the asset list
    await waitFor(element(by.text('test asset')))
      .toBeVisible()
      .withTimeout(5000);

    // Navigate to the user group list screen
    await element(by.text('AUFGABEN')).tap();

    // Navigate to the asset creation screen
    await element(by.id('TaskListScreenAddButton')).tap();

    // Add a task and subtask
    await element(by.id('taskCreationNameInput')).typeText('Task test\n');
    await element(by.id('assetSelectionButton')).tap();
    await element(by.text('test asset')).tap();

    // Wait shortly for the asset to become visible in the asset list
    await waitFor(element(by.text('test asset')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('addSubTaskButton')).tap();
    await element(by.id('subTaskInput')).typeText('help\n');
    await element(by.id('creationDoneButton')).tap();

    //Edit the task
    await element(by.text('Task test')).tap();
    await element(by.id('TaskDetailScreenMenuButton')).tap();
    await element(by.id('TaskEditButton')).tap();
    await element(by.id('addSubTaskButton')).tap();
    await element(by.id('subTaskInput')).typeText('help me again\n');
    // agin can't put a ref for a specific X button to delete a specific subtask
    await element(by.id('creationDoneButton')).tap();

    //Delete the task
    await element(by.id('TaskDetailScreenMenuButton')).tap();
    await element(by.id('TaskDeleteButton')).tap();

    // Check that the task has been deleted
    await waitFor(element(by.text('Task test')))
      .not.toBeVisible()
      .withTimeout(5000);

    // Open and delete the asset
    await element(by.text('KULTURGÜTER')).tap();
    await element(by.text('test asset')).tap();
    await element(by.id('assetDetailScreenMenuButton')).tap();
    await element(by.id('assetDetailScreenDeleteButton')).tap();

    // Check that the asset has been deleted
    await waitFor(element(by.text('test asset')))
      .not.toBeVisible()
      .withTimeout(5000);

    // Logout
    await element(by.id('navigationBarLogoutButton')).tap();
  });
});
