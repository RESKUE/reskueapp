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
import {
  AuthContext,
  FancyList,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskListItem from '../../components/listItems/SubtaskListItem';
import SubtaskUnpressableListItem from '../../components/listItems/SubtaskUnpressableListItem';
import UserUnpressableListItem from '../../components/listItems/UserUnpressableListItem';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useTask from '../../handlers/TaskHook';
import useTaskCreation from '../../handlers/TaskCreationHook';
import useTaskHelpers from '../../handlers/TaskHelpersHook';
import useUserMe from '../../handlers/UserMeHook';
import useSubtask from '../../handlers/SubtaskHook';
import useSubtasks from '../../handlers/SubtaksHook';
import Task from '../../models/Task';

export default function TaskDetailScreen({navigation, route}) {
  const {clientRoles} = React.useContext(AuthContext);

  const [menuVisible, setMenuVisible] = React.useState(false);

  const [task, setTask] = React.useState(null);
  const [helpers, setHelpers] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const {colors} = useTheme();
  const {requestTask, requestTaskDeletion, getResult: taskResult} = useTask();
  const {
    requestTaskHelpers,
    assignTaskHelper,
    removeTaskHelper,
    getResult: helpersResult,
    updateResult,
  } = useTaskHelpers();
  const {putTask, taskResult: taskUpdateResult} = useTaskCreation();
  const {requestSubtasks, result: subtaskResult} = useSubtasks();
  const {putSubtask, result: subtaskUpdateResult} = useSubtask();
  const {requestUserMe, result: userResult} = useUserMe();

  React.useEffect(() => {
    requestUserMe();
  }, [requestUserMe]);

  useFocusEffect(
    React.useCallback(() => {
      requestTask(route.params.id);
      requestTaskHelpers(route.params.id);
      requestSubtasks(route.params.id);
    }, [requestTask, requestTaskHelpers, requestSubtasks, route.params]),
  );

  React.useEffect(() => {
    if (taskResult) {
      setTask(new Task(taskResult.data));
    }
  }, [taskResult]);

  React.useEffect(() => {
    if (subtaskResult?.data) {
      setSubtasks(subtaskResult.data.content);
    }
  }, [subtaskResult, setSubtasks]);

  React.useEffect(() => {
    if (userResult?.data) {
      userResult.data.helperUsers = [];
      setUser(userResult.data);
    }
  }, [userResult]);

  const taskDataExpression = task?.data;
  const setSubtasks = React.useCallback(
    (subtasks) => {
      const updatedTask = new Task(taskDataExpression);
      updatedTask.data.subtasks = subtasks;
      setTask(updatedTask);
    },
    [taskDataExpression],
  );

  React.useEffect(() => {
    if (helpersResult?.data) {
      setHelpers(helpersResult.data.content);
    }
  }, [helpersResult]);

  React.useEffect(() => {
    if (updateResult?.data) {
      requestTaskHelpers(updateResult.data.id);
    }
  }, [updateResult, requestTaskHelpers]);

  React.useEffect(() => {
    if (taskUpdateResult?.data) {
      setTask(new Task(taskUpdateResult.data));
    }
  }, [taskUpdateResult]);

  React.useEffect(() => {
    if (subtaskUpdateResult?.data) {
      requestTask(route.params.id);
    }
  }, [subtaskUpdateResult, route.params, requestTask]);

  const onChangeSubtaskState = (subtaskId, subtaskState) => {
    const stateAsInt = subtaskState ? 1 : 0;
    const putBody = {state: stateAsInt};
    putSubtask(subtaskId, putBody);
  };

  const resetState = () => {
    const putBody = {state: 0};
    putTask(task.data.id, putBody);

    //task.data.subtasks.forEach((subtask) => {
    //  putSubtask(subtask.id, {state: 0});
    //});
  };

  const onBeginTask = () => {
    assignTaskHelper(task.data.id, user.id);
    const updatedState = Math.max(1, task.data.state);
    const putBody = {state: updatedState};
    putTask(task.data.id, putBody);
  };
  const onCompleteTask = () => {
    if (!canComplete()) {
      ToastAndroid.show(
        'Es müssen alle Pflicht-Teilaufgaben bearbeitet werden!',
        ToastAndroid.SHORT,
      );
      return;
    }
    removeTaskHelper(task.data.id, user.id);
    const updatedState = Math.max(3, task.data.state);
    const putBody = {isEndangered: 0, state: updatedState};
    putTask(task.data.id, putBody);
  };
  const onCancelTask = () => {
    removeTaskHelper(task.data.id, user.id);
    const updatedState = Math.max(2, task.data.state);
    const putBody = {state: updatedState};
    putTask(task.data.id, putBody);
  };

  const goMap = () =>
    navigation.push('CulturalAssetMapScreen', {
      id: taskResult.data.culturalAsset,
    });
  const goAsset = () =>
    navigation.push('CulturalAssetDetailScreen', {
      id: taskResult.data.culturalAsset,
    });

  const goMedia = () => navigation.push('MediaListScreen');
  const goComments = () => console.log('Go to CommentList');

  if (task === null || task.data === null) {
    return <LoadingIndicator />;
  }

  const getButtons = () => {
    //If the task isn't endangered you can't work on it
    if (task?.data?.isEndangered === 0) {
      return null;
    } else {
      //If the user is a helper he can finish the task
      if (isUserHelper()) {
        return (
          <Card.Actions>
            <Button color={colors.primary} onPress={onCompleteTask}>
              Beenden
            </Button>
            <Button color={colors.redish} onPress={onCancelTask}>
              Abbrechen
            </Button>
          </Card.Actions>
        );
      }
      //If the user isn't a helper he start working on the task
      else {
        return (
          <Card.Actions>
            <Button color={colors.primary} onPress={onBeginTask}>
              Aufgabe annehmen
            </Button>
          </Card.Actions>
        );
      }
    }
  };

  const getSubtaskComponent = () => {
    if (isUserHelper()) {
      return SubtaskListItem;
    } else {
      return SubtaskUnpressableListItem;
    }
  };

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title
          title={task.data.name}
          subtitle={getSubtitle()}
          right={buildMenu}
        />
        {task.data.description === '' ? null : (
          <View>
            <Divider />
            <Card.Content style={styles.content}>
              <Paragraph>{task.data.description}</Paragraph>
            </Card.Content>
          </View>
        )}
        <Divider />
        {taskResult.data?.culturalAsset ? (
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
        ) : null}
        {getButtons()}
      </Card>
      {task.data.subtasks.length !== 0 && (
        <View style={styles.listSpacing}>
          <FancyList
            title="Teilaufgaben"
            data={task.data.subtasks}
            extraData={{changeSubtaskStateCallback: onChangeSubtaskState}}
            component={getSubtaskComponent()}
          />
        </View>
      )}
      {task.data.isEndangered ? (
        <FancyList
          title="Helfer"
          data={helpers || []}
          component={UserUnpressableListItem}
        />
      ) : null}

      <View style={styles.center}>
        <FloatingWhiteButton onPress={goMedia} content="Weiter zu den Medien" />
        <FloatingWhiteButton
          onPress={goComments}
          content="Weiter zu den Kommentaren"
        />
      </View>
    </Scaffold>
  );

  function buildMenu(props) {
    if (clientRoles.includes('administrator')) {
      return (
        <Menu
          visible={menuVisible}
          onDismiss={hideMenu}
          anchor={
            <IconButton {...props} icon="dots-vertical" onPress={showMenu} />
          }>
          <Menu.Item onPress={resetState} title="Setze Status zurück" />
          <Menu.Item onPress={goUpdate} title="Bearbeiten" />
          <Menu.Item onPress={deleteTask} title="Löschen" />
        </Menu>
      );
    } else {
      return null;
    }
  }

  function getSubtitle() {
    const status = `Status: ${task.getTaskStateName()}`;
    const recommendedHelpers = `Empf. Helferanzahl: ${task.data.recommendedHelperUsers}`;
    const subtitle = `${status} | ${recommendedHelpers}`;
    return subtitle;
  }

  function showMenu() {
    setMenuVisible(true);
  }

  function hideMenu() {
    setMenuVisible(false);
  }

  function goUpdate() {
    hideMenu();
    navigation.push('TaskCreationScreen', {
      screenType: 'update',
      id: task.data.id,
    });
  }

  async function deleteTask() {
    hideMenu();
    const result = await requestTaskDeletion(task.data.id);
    if (result.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Task deletion failed:', result?.data, result?.error);
    }
  }

  function isUserHelper() {
    return helpers?.some((helper) => helper.id === user.id);
  }

  function canComplete() {
    task.data.subtasks.forEach((subtask) => {
      if (subtask.state === 0 && subtask.isRequired) {
        return false;
      }
    });
    return true;
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
