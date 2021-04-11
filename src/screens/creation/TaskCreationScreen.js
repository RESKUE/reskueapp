import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {useTheme, IconButton, Button, TextInput} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskCreationListItem from '../../components/listItems/SubtaskCreationListItem';
import CulturalAssetCreationListItem from '../../components/listItems/CulturalAssetCreationListItem';
import ListActions from '../../components/ListActions';
import useAsset from '../../handlers/AssetHook';
import useSubtasks from '../../handlers/SubtasksHook';
import useTask from '../../handlers/TaskHook';

export default function TaskCreationScreen({navigation, route}) {
  const selectedAsset = route.params?.selectedAsset ?? null;
  const taskId = route.params?.id ?? null;
  const updatingExistingTask = taskId !== null;

  const [submitting, setSubmitting] = React.useState(false);
  const [task, setTask] = React.useState();
  const [asset, setAsset] = React.useState(null);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(0);

  const {colors} = useTheme();
  const {requestAsset} = useAsset();
  const {get: getSubtasks} = useSubtasks();
  const {get: getTask, put: putTask, post: postTask} = useTask();

  const fetchExistingData = React.useCallback(async () => {
    console.log('Requesting existing task with id:', taskId);
    const baseTaskResult = await getTask(taskId);
    setTask(baseTaskResult.data);

    if (baseTaskResult.data.culturalAsset) {
      const assetResult = await requestAsset(baseTaskResult.data.culturalAsset);
      onAssetChange(assetResult.data);
    }

    if (baseTaskResult.data.subtasks.length > 0) {
      const subtasksResult = await getSubtasks(baseTaskResult.data.id);
      setSubtasks(subtasksResult.data.content);
    }
  }, [
    taskId,
    getTask,
    setTask,
    requestAsset,
    onAssetChange,
    getSubtasks,
    setSubtasks,
  ]);

  // Load existing task data if an existing task is updated
  React.useEffect(() => {
    if (updatingExistingTask) {
      fetchExistingData();
    }
  }, [updatingExistingTask, fetchExistingData]);

  // A cultural asset has been selected by the user or pre submitted to the screen.
  React.useEffect(() => {
    if (selectedAsset) {
      onAssetChange(selectedAsset);
    }
  }, [onAssetChange, selectedAsset]);

  const onAssetChange = React.useCallback(
    (updatedAsset) => {
      const updatedTask = {...task};
      if (updatedAsset) {
        updatedTask.culturalAsset = updatedAsset;
        setAsset([updatedAsset]);
      }
      setTask(updatedTask);
    },
    [task],
  );

  const setSubtasks = React.useCallback(
    (subtasks) => {
      setTask({...task, subtasks});
    },
    [task],
  );

  if (selectedAsset && !asset) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={task?.name}
        onChangeText={onNameChange}
        disabled={submitting}
      />
      <TextInput
        label="Beschreibung"
        value={task?.description}
        onChangeText={onDescriptionChange}
        disabled={submitting}
      />
      <TextInput
        label="Empfohlene Helferanzahl"
        keyboardType="number-pad"
        value={task?.recommendedHelperUsers?.toString()}
        onChangeText={onRecommendedHelperUsersChange}
        disabled={submitting}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={openAssetSelection}
          disabled={submitting}
        />
      </ListActions>
      <FancyList
        title="Kulturgut"
        placeholder="Kein Kulturgut ausgewählt"
        data={asset ?? []}
        extraData={{removeCallback: removeCulturalAsset}}
        component={CulturalAssetCreationListItem}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={addSubtask}
          disabled={submitting}
        />
      </ListActions>
      <FancyList
        title="Teilaufgaben"
        placeholder="Keine Teilaufgaben vorhanden"
        data={task?.subtasks ?? []}
        extraData={{
          removeCallback: removeSubtask,
          changeTextCallback: onSubtaskTextChange,
          changeIsRequiredCallback: onSubtaskIsRequiredChange,
        }}
        component={SubtaskCreationListItem}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={submit}
        loading={submitting}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );

  function onNameChange(name) {
    setTask({...task, name});
  }

  function onDescriptionChange(description) {
    setTask({...task, description});
  }

  function onRecommendedHelperUsersChange(recommendedHelperUsers) {
    setTask({...task, recommendedHelperUsers});
  }

  function addSubtask() {
    const emptySubtask = {
      localId: subtaskIdCounter,
      state: 0,
      text: '',
      isRequired: false,
    };
    const oldSubtasks = task?.subtasks ?? [];
    const updatedTask = {...task, subtasks: oldSubtasks.concat([emptySubtask])};
    setSubtaskIdCounter(subtaskIdCounter + 1);
    setTask(updatedTask);
  }

  function removeSubtask(subtaskId) {
    const updatedTask = {...task};
    updatedTask.subtasks.splice(
      updatedTask.subtasks.findIndex(
        (subtask) => subtask.localId === subtaskId,
      ),
      1,
    );
    setTask(updatedTask);
  }

  function onSubtaskTextChange(subtaskId, text) {
    const updatedTask = {...task};
    const index = updatedTask.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.subtasks[index].text = text;
    setTask(updatedTask);
  }

  function onSubtaskIsRequiredChange(subtaskId, isRequired) {
    const updatedTask = {...task};
    const index = updatedTask.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.subtasks[index].isRequired = isRequired;
    setTask(updatedTask);
  }

  function openAssetSelection() {
    navigation.push('AssetSelectionScreen', {
      previousRouteName: 'TaskCreationScreen',
    });
  }

  function removeCulturalAsset() {
    const updatedTask = {...task};
    updatedTask.culturalAsset = null;
    setTask(updatedTask);
    setAsset([]);
  }

  async function submit() {
    // Validate data
    if (!task?.name || !task?.culturalAsset) {
      ToastAndroid.show(
        'Es muss ein Name und ein zugehöriges Kulturgut gewählt werden!',
        ToastAndroid.SHORT,
      );
      return;
    }

    // Adjust data format for backend
    task.culturalAsset = {id: task?.culturalAsset?.id};
    task.subtasks.forEach((subtask) => {
      delete subtask.localId;
    });
    task.subtasks.forEach((subtask) => {
      delete subtask.task;
    });

    // Send data
    setSubmitting(true);

    if (updatingExistingTask) {
      console.log('Updating task:', task);
      const taskResult = await putTask(task.id, task);

      if (taskResult?.data) {
        navigation.goBack();
      } else {
        console.log('Task update failed:', taskResult?.error);
        setSubmitting(false);
      }
    } else {
      console.log('Creating task:', task);
      const taskResult = await postTask(task);

      if (taskResult?.data) {
        navigation.goBack();
      } else {
        console.log('Task creation failed:', taskResult?.error);
        setSubmitting(false);
      }
    }
  }
}

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
