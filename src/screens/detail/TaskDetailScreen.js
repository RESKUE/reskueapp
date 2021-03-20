import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTheme,
  Button,
  Divider,
  IconButton,
  Paragraph,
  Text,
  Title,
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
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/AssetHook';
import useTask from '../../handlers/TaskHook';
import useUserMe from '../../handlers/UserMeHook';
import useSubtasks from '../../handlers/SubtaksHook';
import Task from '../../models/Task';

export default function TaskDetailScreen({navigation, route}) {
  const {clientRoles} = React.useContext(AuthContext);

  const [task, setTask] = React.useState(null);
  const [asset, setAsset] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const {colors} = useTheme();
  const {requestTask, requestTaskDeletion, getResult: taskResult} = useTask();
  const {requestAsset, result: assetResult} = useAsset();
  const {requestSubtasks, result: subtaskResult} = useSubtasks();
  const {requestUserMe, result: userResult} = useUserMe();

  React.useEffect(() => {
    requestUserMe();
  }, [requestUserMe]);

  React.useEffect(() => {
    requestTask(route.params.id);
  }, [requestTask, route.params]);

  React.useEffect(() => {
    if (taskResult) {
      setTask(new Task(taskResult.data));
      requestSubtasks(taskResult.data.id);
      if (taskResult.data?.culturalAsset) {
        requestAsset(taskResult.data.culturalAsset);
      } else {
        setAsset([]);
      }
    }
  }, [requestAsset, requestSubtasks, taskResult]);

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

  React.useEffect(() => {
    if (assetResult?.data) {
      setAsset(assetResult.data);
    }
  }, [assetResult]);

  const taskDataExpression = task?.data;
  const setSubtasks = React.useCallback(
    (subtasks) => {
      const updatedTask = new Task(taskDataExpression);
      updatedTask.data.subtasks = subtasks;
      setTask(updatedTask);
    },
    [taskDataExpression],
  );

  const onChangeSubtaskState = (subtaskId) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId,
    );
    updatedTask.data.subtasks[index].state = !updatedTask.data.subtasks[index]
      .state;
    setTask(updatedTask);
  };

  const resetState = () => {
    const updatedTask = new Task(task.data);
    updatedTask.data.state = 0;
    updatedTask.data.subtasks.forEach((subtask) => {
      subtask.state = 0;
    });
    setTask(updatedTask);
  };

  const onAcceptTask = () => {
    const updatedHelpers = [...task.data.helperUsers, user];
    const updatedTask = new Task(task.data);
    updatedTask.data.helperUsers = updatedHelpers;
    updatedTask.data.state = 1;
    setTask(updatedTask);
  };
  const onCompleteTask = () => {
    const updatedTask = new Task(task.data);
    const updatedHelpers = updatedTask.data.helperUsers.filter(
      (helperUser) => helperUser.id !== user.id,
    );
    updatedTask.data.helperUsers = updatedHelpers;
    updatedTask.data.state = 3;
    updatedTask.data.isEndangered = !updatedTask.data.isEndangered;
    setTask(updatedTask);
  };
  const onCancelTask = () => {
    const updatedTask = new Task(task.data);
    const updatedHelpers = updatedTask.data.helperUsers.filter(
      (helperUser) => helperUser.id !== user.id,
    );
    updatedTask.data.helperUsers = updatedHelpers;
    updatedTask.data.state = 2;
    setTask(updatedTask);
  };

  const goMap = () => navigation.push('CulturalAssetMapScreen', {id: asset.id});
  const goAsset = () =>
    navigation.push('CulturalAssetDetailScreen', {id: asset.id});

  const goMedia = () => navigation.push('MediaListScreen');
  const goComments = () => console.log('Go to CommentList');

  if (task === null || task.data === null || asset === null) {
    return <LoadingIndicator />;
  }

  const getButtons = () => {
    //If the task isn't endangered you can't work on it
    if (task?.data?.isEndangered === 0) {
      return null;
    } else {
      //If the user is a helper he can finish the task
      if (task?.data?.helperUsers?.includes(user)) {
        return (
          <ListActions>
            <Button color={colors.primary} onPress={onCompleteTask}>
              Beenden
            </Button>
            <Button color={colors.redish} onPress={onCancelTask}>
              Abbrechen
            </Button>
          </ListActions>
        );
      }
      //If the user isn't a helper he start working on the task
      else {
        return (
          <ListActions>
            <Button color={colors.primary} onPress={onAcceptTask}>
              Aufgabe annehmen
            </Button>
          </ListActions>
        );
      }
    }
  };

  const getSubtaskComponent = () => {
    if (task?.data?.helperUsers?.includes(user)) {
      return SubtaskListItem;
    } else {
      return SubtaskUnpressableListItem;
    }
  };

  return (
    <Scaffold>
      <Title style={styles.title}>{task.data.name}</Title>
      {task.data.description === '' ? null : (
        <Paragraph>{task.data.description}</Paragraph>
      )}

      <View>
        {asset.name ? (
          <View style={styles.buttonContainer}>
            <Button
              color={colors.primary}
              icon="map-marker"
              onPress={goMap}
              style={styles.bold}>
              Location
            </Button>
            <Button
              color={colors.primary}
              icon="apps"
              onPress={goAsset}
              style={styles.bold}>
              {asset.name}
            </Button>
          </View>
        ) : null}
      </View>
      {clientRoles.includes('administrator') ? (
        <View>
          <ListActions>
            <IconButton
              color={colors.primary}
              icon="circle-edit-outline"
              onPress={goUpdate}
            />
            <IconButton
              color={colors.primary}
              icon="trash-can-outline"
              onPress={deleteTask}
            />
          </ListActions>
        </View>
      ) : null}
      {getButtons()}
      <Divider style={styles.divider} />
      <Text style={styles.bold}>
        Empfohlene Helferanzahl: {task.data.recommendedHelperUsers}
      </Text>
      <Text style={styles.bold}>Status: {task.getTaskStateName()}</Text>
      {clientRoles.includes('administrator') ? (
        <Button color={colors.redish} onPress={resetState}>
          Setze Status zurück
        </Button>
      ) : null}
      <Divider style={styles.divider} />
      <FancyList
        title="Teilaufgaben"
        data={task.data.subtasks}
        extraData={{changeSubtaskStateCallback: onChangeSubtaskState}}
        component={getSubtaskComponent()}
      />
      {task.data.isEndangered ? (
        <View>
          <Divider style={styles.divider} />
          <FancyList
            title="Helfer"
            data={task.data.helperUsers || []}
            component={UserUnpressableListItem}
          />
        </View>
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

  async function deleteTask() {
    const result = await requestTaskDeletion(task.data.id);
    if (result.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Task deletion failed:', result?.data, result?.error);
    }
  }

  function goUpdate() {
    navigation.push('TaskCreationScreen', {
      screenType: 'update',
      id: task.data.id,
    });
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: -24,
    marginLeft: -12,
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: 'black',
    marginVertical: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
