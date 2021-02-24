import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, IconButton, Paragraph, Text, Title} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskListItem from '../../components/listItems/SubtaskListItem';
import CulturalAssetUnpressableListItem from '../../components/listItems/CulturalAssetUnpressableListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/AssetHook';
import useTask from '../../handlers/TaskHook';
import Task from '../../models/Task';

export default function TaskDetailScreen({navigation, route}) {
  const [task, setTask] = React.useState(null);
  const [asset, setAsset] = React.useState(null);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(0);

  const {colors} = useTheme();
  const {requestTask, result: taskResult} = useTask();
  const {requestAsset, result: assetResult} = useAsset();

  React.useEffect(() => {
    requestTask(route.params.id);
  }, [requestTask, route.params]);

  React.useEffect(() => {
    if (taskResult) {
      setTask(new Task(taskResult.data));
      if (taskResult.data.culturalAsset) {
        requestAsset(taskResult.data.culturalAsset.id);
      } else {
        setAsset([]);
      }
    }
  }, [requestAsset, taskResult]);

  React.useEffect(() => {
    if (assetResult) {
      onChangeAsset();
    }
  }, [onChangeAsset, assetResult]);

  const onChangeAsset = React.useCallback(() => {
    const updatedTask = new Task(task.data);
    if (assetResult.data) {
      updatedTask.data.culturalAsset = assetResult.data;
      setAsset([assetResult.data]);
    }
    setTask(updatedTask);
  }, [assetResult, task]);

  const addSubtask = () => {
    const emptySubtask = {
      id: subtaskIdCounter,
      state: 0,
      text: '',
      isRequired: true,
    };
    const updatedTask = new Task(task.data);
    updatedTask.data.subtasks.push(emptySubtask);
    setSubtaskIdCounter(subtaskIdCounter + 1);
    setTask(updatedTask);
  };

  const onChangeSubtaskState = (subtaskId, state) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId,
    );
    updatedTask.data.subtasks[index].state = state;
    setTask(updatedTask);
  };

  const goMedia = () => navigation.push('MediaListScreen');
  const goComments = () => console.log('Go to CommentList');

  if (task === null || asset === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <Title style={styles.title}>{task.data.name}</Title>
      <Paragraph>{task.data.description}</Paragraph>
      <Text>{task.data.recommendedHelperUsers}</Text>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={addSubtask}
        />
      </ListActions>
      <FancyList
        title="Teilaufgaben"
        data={task.data.subtasks}
        extraData={{changeSubtaskStateCallback: onChangeSubtaskState}}
        component={SubtaskListItem}
      />
      <FancyList
        title="Helfer"
        data={[]}
        component={CulturalAssetUnpressableListItem}
      />
      <View style={styles.center}>
        <FloatingWhiteButton onPress={goMedia} content="Weiter zu den Medien" />
        <FloatingWhiteButton
          onPress={goComments}
          content="Weiter zu den Kommentaren"
        />
      </View>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
