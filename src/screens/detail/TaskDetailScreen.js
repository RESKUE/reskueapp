import React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  useTheme,
  Button,
  Card,
  Divider,
  IconButton,
  Menu,
  Paragraph,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskListItem from '../../components/listItems/SubtaskListItem';
import UserUnpressableListItem from '../../components/listItems/UserUnpressableListItem';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useTask from '../../handlers/TaskHook';
import useTaskHelpers from '../../handlers/TaskHelpersHook';
import useUserMe from '../../handlers/UserMeHook';
import useSubtask from '../../handlers/SubtaskHook';
import useSubtasks from '../../handlers/SubtasksHook';
import TaskStates from '../../models/TaskStates';
import useRoles from '../../handlers/RolesHook';

export default function TaskDetailScreen({navigation, route}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [task, setTask] = React.useState(null);
  const [subtasks, setSubtasks] = React.useState(null);
  const [helpers, setHelpers] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const {isAdmin} = useRoles();
  const {colors} = useTheme();
  const {
    result: taskResult,
    get: getTask,
    put: putTask,
    del: delTask,
  } = useTask();
  const {
    requestTaskHelpers,
    assignTaskHelper,
    removeTaskHelper,
    getResult: helpersResult,
  } = useTaskHelpers();
  const {result: subtaskResult, get: getSubtasks} = useSubtasks();
  const {putSubtask} = useSubtask();
  const {requestUserMe, result: userResult} = useUserMe();

  React.useEffect(() => {
    requestUserMe();
  }, [requestUserMe]);

  const fetchData = React.useCallback(() => {
    getTask(route.params.id);
    requestTaskHelpers(route.params.id);
    getSubtasks(route.params.id);
  }, [getTask, requestTaskHelpers, getSubtasks, route.params]);

  useFocusEffect(fetchData);

  React.useEffect(() => {
    if (taskResult) {
      setTask(taskResult.data);
    }
  }, [taskResult]);

  React.useEffect(() => {
    if (subtaskResult?.data) {
      const subtaskData = subtaskResult.data.content;
      subtaskData.sort((subtask1, subtask2) =>
        subtask1.id < subtask2.id ? -1 : 1,
      );
      setSubtasks(subtaskData);
    }
  }, [subtaskResult]);

  React.useEffect(() => {
    if (userResult?.data) {
      userResult.data.helperUsers = [];
      setUser(userResult.data);
    }
  }, [userResult]);

  React.useEffect(() => {
    if (helpersResult?.data) {
      setHelpers(helpersResult.data.content);
    }
  }, [helpersResult]);

  const goMap = () =>
    navigation.navigate('CulturalAssetMapScreen', {
      id: taskResult.data.culturalAsset,
    });
  const goAsset = () =>
    navigation.navigate({
      name: 'CulturalAssetDetailScreen',
      key: taskResult.data.culturalAsset,
      params: {id: taskResult.data.culturalAsset},
    });

  if (!task || !subtasks) {
    return <LoadingIndicator />;
  }

  const getButtons = () => {
    //If the task isn't endangered you can't work on it
    if (!task.isEndangered) {
      return null;
    } else {
      //If the user is a helper he can finish the task
      if (isUserHelper()) {
        return (
          <Card.Actions>
            <Button
              color={colors.primary}
              onPress={onCompleteTask}
              testID="finishTaskButton">
              Beenden
            </Button>
            <Button
              color={colors.redish}
              onPress={onCancelTask}
              testID="cancelTaskButton">
              Abbrechen
            </Button>
          </Card.Actions>
        );
      }
      //If the user isn't a helper he start working on the task
      else {
        return (
          <Card.Actions>
            <Button
              color={colors.primary}
              onPress={onBeginTask}
              testID="startTaskButton">
              Aufgabe annehmen
            </Button>
          </Card.Actions>
        );
      }
    }
  };

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title
          title={task.name}
          subtitle={getSubtitle()}
          right={buildMenu}
        />
        {!!task.description && (
          <View>
            <Divider />
            <Card.Content style={styles.content}>
              <Paragraph>{task.description}</Paragraph>
            </Card.Content>
          </View>
        )}
        <Divider />
        {!!taskResult.data.culturalAsset && (
          <Card.Actions>
            <Button
              color={colors.primary}
              icon="map-marker"
              onPress={goMap}
              style={styles.bold}>
              Zur Karte
            </Button>
            <Button
              color={colors.primary}
              icon="apps"
              onPress={goAsset}
              style={styles.bold}>
              Zum Kulturgut
            </Button>
          </Card.Actions>
        )}
        {getButtons()}
      </Card>
      {subtasks.length > 0 && (
        <View style={styles.listSpacing}>
          <FancyList
            title="Teilaufgaben"
            data={subtasks}
            extraData={getSubtaskExtraData()}
            component={SubtaskListItem}
          />
        </View>
      )}
      {!!task.isEndangered && (
        <FancyList
          title="Helfer"
          placeholder="Keine Helfer vorhanden"
          data={helpers || []}
          component={UserUnpressableListItem}
        />
      )}

      <View style={styles.center}>
        <FloatingWhiteButton
          onPress={openComments}
          content="Zu den Kommentaren"
          testID="goToCommentButton"
        />
      </View>
    </Scaffold>
  );

  function buildMenu(props) {
    if (isAdmin) {
      return (
        <Menu
          visible={menuVisible}
          onDismiss={hideMenu}
          anchor={
            <IconButton
              {...props}
              icon="dots-vertical"
              onPress={showMenu}
              testID="TaskDetailScreenMenuButton"
            />
          }>
          <Menu.Item onPress={resetState} title="Setze Status zurück" />
          <Menu.Item
            onPress={goUpdate}
            title="Bearbeiten"
            testID="TaskEditButton"
          />
          <Menu.Item
            onPress={deleteTask}
            title="Löschen"
            testID="TaskDeleteButton"
          />
        </Menu>
      );
    } else {
      return null;
    }
  }

  function getSubtitle() {
    const status = `Status: ${TaskStates[task.state]}`;
    const recommendedHelpers = `Empf. Helferanzahl: ${task.recommendedHelperUsers}`;
    const subtitle = `${status} | ${recommendedHelpers}`;
    return subtitle;
  }

  function getSubtaskExtraData() {
    if (isUserHelper()) {
      return {changeSubtaskStateCallback: onChangeSubtaskState};
    } else {
      return {};
    }
  }

  function showMenu() {
    setMenuVisible(true);
  }

  function hideMenu() {
    setMenuVisible(false);
  }

  function goUpdate() {
    hideMenu();
    navigation.navigate('TaskCreationScreen', {id: task.id});
  }

  async function deleteTask() {
    hideMenu();
    const result = await delTask(task.id);
    if (result.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Task deletion failed:', result?.data, result?.error);
    }
  }

  async function onBeginTask() {
    const updateResult = await assignTaskHelper(task.id, user.id);
    if (updateResult?.data) {
      requestTaskHelpers(updateResult.data.id);
    } else {
      console.log(
        'Assigning helper failed:',
        updateResult,
        updateResult?.error,
      );
      return;
    }
    const updatedState = Math.max(1, task.state);
    const putBody = {state: updatedState};

    const result = await putTask(task.id, putBody);
    if (result.data) {
      setTask(result.data);
    } else {
      console.log('Starting Task failed:', result, result?.error);
    }
  }

  async function onCompleteTask() {
    if (!canComplete()) {
      ToastAndroid.show(
        'Es müssen alle Pflicht-Teilaufgaben bearbeitet werden!',
        ToastAndroid.SHORT,
      );
      return;
    }
    const updatedState = Math.max(3, task.state);
    const putBody = {isEndangered: 0, state: updatedState};
    const result = await putTask(task.id, putBody);
    if (result.data) {
      setTask(result.data);
    } else {
      console.log('Completing Task failed:', result, result?.error);
      return;
    }

    const updateResult = await removeTaskHelper(task.id, user.id);
    if (updateResult?.data) {
      requestTaskHelpers(updateResult.data.id);
    } else {
      console.log('Remove helper failed:', updateResult, updateResult?.error);
    }
  }

  async function onCancelTask() {
    const updatedState = Math.max(2, task.state);
    const putBody = {state: updatedState};
    const result = await putTask(task.id, putBody);
    if (result.data) {
      setTask(result.data);
    } else {
      console.log('Cancelling task failed:', result, result?.error);
      return;
    }

    const updateResult = await removeTaskHelper(task.id, user.id);
    if (updateResult?.data) {
      requestTaskHelpers(updateResult.data.id);
    } else {
      console.log('Remove helper failed:', updateResult, updateResult?.error);
    }
  }

  async function resetState() {
    const resetSubtasks = [];
    if (subtasks.length) {
      subtasks.forEach((subtask) => {
        //Remove local ids
        delete subtask.task;
        resetSubtasks.push({...subtask, state: 0});
      });
    }

    const putBody = {state: 0, subtasks: resetSubtasks};
    const result = await putTask(task.id, putBody);
    if (result.data) {
      fetchData();
      ToastAndroid.show('Aufgabe wird neu geladen.', ToastAndroid.SHORT);
    } else {
      console.log('Reseting Task failed:', result, result?.error);
      ToastAndroid.show('Zurücksetzen fehlgeschlagen!', ToastAndroid.SHORT);
    }
  }

  async function onChangeSubtaskState(subtaskId, subtaskState) {
    const stateAsInt = subtaskState ? 1 : 0;
    const putBody = {state: stateAsInt};
    const result = await putSubtask(subtaskId, putBody);
    if (result.data) {
      getSubtasks(route.params.id);
    } else {
      console.log('Changing subtask-state failed:', result, result?.error);
    }
  }

  function isUserHelper() {
    return helpers?.some((helper) => helper.id === user.id);
  }

  function canComplete() {
    var completable = true;
    subtasks.forEach((subtask) => {
      if (subtask.state === 0 && subtask.isRequired) {
        completable = false;
      }
    });
    return completable;
  }

  function openComments() {
    navigation.navigate('CommentListScreen', {taskId: task.id});
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: -24,
    marginLeft: -12,
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
  },
  content: {
    paddingVertical: 8,
  },
  listSpacing: {
    marginBottom: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
