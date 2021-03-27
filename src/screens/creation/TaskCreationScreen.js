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

  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [task, setTask] = React.useState();
  const [asset, setAsset] = React.useState(null);
  const [subtasks, setSubtasks] = React.useState([]);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(-1);

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
      setAsset([assetResult.data]);
    }

    if (baseTaskResult.data.subtasks.length > 0) {
      const subtasksResult = await getSubtasks(baseTaskResult.data.id);
      setSubtasks(subtasksResult.data.content);
    }

    setLoading(false);
  }, [taskId, getTask, requestAsset, getSubtasks]);

  // Load existing task data if an existing task is updated
  React.useEffect(() => {
    if (updatingExistingTask) {
      fetchExistingData();
    } else {
      setLoading(false);
    }
  }, [updatingExistingTask, fetchExistingData]);

  // A cultural asset has been selected by the user or pre submitted to the screen.
  React.useEffect(() => {
    if (selectedAsset) {
      setAsset([selectedAsset]);
    }
  }, [selectedAsset]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={task?.name}
        onChangeText={onNameChange}
        disabled={submitting}
        testID="taskCreationNameInput"
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
          icon={getIconName()}
          onPress={openAssetSelection}
          disabled={submitting}
          testID="assetSelectionButton"
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
          testID="addSubTaskButton"
        />
      </ListActions>
      <FancyList
        title="Teilaufgaben"
        placeholder="Keine Teilaufgaben vorhanden"
        data={subtasks ?? []}
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
        testID="creationDoneButton">
        Fertig
      </Button>
    </Scaffold>
  );

  function getIconName() {
    if (asset?.length) {
      return 'circle-edit-outline';
    } else {
      return 'plus-circle-outline';
    }
  }

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
      id: subtaskIdCounter,
      state: 0,
      text: '',
      isRequired: false,
    };
    setSubtaskIdCounter(subtaskIdCounter - 1);
    setSubtasks(subtasks.concat([emptySubtask]));
  }

  function removeSubtask(subtaskId) {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(
      updatedSubtasks.findIndex((subtask) => subtask.id === subtaskId),
      1,
    );
    setSubtasks(updatedSubtasks);
  }

  function onSubtaskTextChange(subtaskId, text) {
    const updatedSubtasks = [...subtasks];
    const index = subtasks.findIndex((subtask) => subtask.id === subtaskId);
    updatedSubtasks[index].text = text;
    setSubtasks(updatedSubtasks);
  }

  function onSubtaskIsRequiredChange(subtaskId, isRequired) {
    const updatedSubtasks = [...subtasks];
    const index = subtasks.findIndex((subtask) => subtask.id === subtaskId);
    updatedSubtasks[index].isRequired = isRequired;
    setSubtasks(updatedSubtasks);
  }

  function openAssetSelection() {
    navigation.navigate('AssetSelectionScreen', {
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
    if (!task?.name || !asset?.length) {
      ToastAndroid.show(
        'Es muss ein Name und ein zugehöriges Kulturgut gewählt werden!',
        ToastAndroid.SHORT,
      );
      return;
    }
    if (!subtasksHaveText()) {
      ToastAndroid.show(
        'Es muss ein Text für jede Teilaufgabe angegeben werden!',
        ToastAndroid.SHORT,
      );
      return;
    }

    // Adjust data format for backend
    task.culturalAsset = {id: asset[0].id};
    if (subtasks.length) {
      subtasks.forEach((subtask) => {
        //Remove local ids
        if (subtask.id < 0) {
          delete subtask.id;
        }
        delete subtask.task;
      });
      task.subtasks = subtasks;
    }

    // Send data
    setSubmitting(true);

    if (updatingExistingTask) {
      console.log('Updating task:', task);
      const taskResult = await putTask(taskId, task);

      if (taskResult?.data) {
        navigation.goBack();
      } else {
        console.log('Task update failed:', taskResult?.error);
        ToastAndroid.show('Update fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    } else {
      console.log('Creating task:', task);
      const taskResult = await postTask(task);

      if (taskResult?.data) {
        navigation.goBack();
      } else {
        console.log('Task creation failed:', taskResult?.error);
        ToastAndroid.show('Erstellung fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    }
  }

  function subtasksHaveText() {
    var noEmptyText = true;
    if (subtasks.length) {
      subtasks.forEach((subtask) => {
        if (subtask.text === '') {
          noEmptyText = false;
        }
      });
    }
    return noEmptyText;
  }
}

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
