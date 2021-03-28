import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {useTheme, IconButton, Button, TextInput} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskCreationListItem from '../../components/listItems/SubtaskCreationListItem';
import CulturalAssetCreationListItem from '../../components/listItems/CulturalAssetCreationListItem';
import ListActions from '../../components/ListActions';
import useAsset from '../../handlers/AssetHook';
import useSubtasks from '../../handlers/SubtaksHook';
import useTask from '../../handlers/TaskHook';
import useTaskCreation from '../../handlers/TaskCreationHook';

export default function TaskCreationScreen({navigation, route}) {
  const {requestTask, getResult: baseTaskResult} = useTask();

  const screenType = route.params?.screenType;

  const [task, setTask] = React.useState({
    name: '',
    description: '',
    state: 0,
    subtasks: [],
    recommendedHelperUsers: 1,
  });
  const [asset, setAsset] = React.useState(null);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(0);

  const {colors} = useTheme();
  const {requestAsset, result: assetResult} = useAsset();
  const {requestSubtasks, result: subtaskResult} = useSubtasks();
  const {postTask, putTask, taskResult} = useTaskCreation();

  React.useEffect(() => {
    if (screenType === 'update' && !task.id) {
      console.log('Request task with id: ' + route.params.id);
      requestTask(route.params.id);
    }
  }, [requestTask, screenType, route.params.id, task]);

  React.useEffect(() => {
    if (baseTaskResult && !task.id) {
      setTask(baseTaskResult.data);
      if (baseTaskResult.data.culturalAsset) {
        requestAsset(baseTaskResult.data.culturalAsset);
      }
      if (baseTaskResult.data.subtasks.length !== 0) {
        requestSubtasks(baseTaskResult.data.id);
      }
    }
  }, [requestAsset, requestSubtasks, baseTaskResult, task]);

  React.useEffect(() => {
    const selectedAsset = route.params?.selectedAsset;
    if (selectedAsset) {
      selectedAsset;
      onChangeAsset(selectedAsset);
    } else if (screenType === 'creation') {
      setAsset([]);
    }
  }, [requestAsset, onChangeAsset, screenType, route.params]);

  React.useEffect(() => {
    if (assetResult?.data) {
      onChangeAsset(assetResult.data);
    }
  }, [onChangeAsset, assetResult]);

  React.useEffect(() => {
    if (subtaskResult?.data && screenType === 'update') {
      setSubtasks(subtaskResult.data.content);
    }
  }, [subtaskResult, screenType, setSubtasks]);

  React.useEffect(() => {
    if (taskResult?.data != null) {
      navigation.goBack();
    } else {
      console.log(taskResult);
    }
  }, [taskResult, navigation]);

  const onChangeName = (name) => {
    setTask({...task, name});
  };
  const onChangeDescription = (description) => {
    setTask({...task, description});
  };
  const onChangeRecommendedHelperUsers = (recommendedHelperUsers) => {
    setTask({...task, recommendedHelperUsers});
  };

  const onChangeAsset = React.useCallback(
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

  function removeCulturalAsset() {
    const updatedTask = {...task};
    updatedTask.culturalAsset = null;
    setTask(updatedTask);
    setAsset([]);
  }

  const setSubtasks = React.useCallback(
    (subtasks) => {
      setTask({...task, subtasks});
    },
    [task],
  );

  const addSubtask = () => {
    const emptySubtask = {
      localId: subtaskIdCounter,
      state: 0,
      text: '',
      isRequired: false,
    };
    const updatedTask = {...task};
    updatedTask.subtasks.push(emptySubtask);
    setSubtaskIdCounter(subtaskIdCounter + 1);
    setTask(updatedTask);
  };

  const onChangeSubtaskText = (subtaskId, text) => {
    const updatedTask = {...task};
    const index = updatedTask.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.subtasks[index].text = text;
    setTask(updatedTask);
  };

  const onChangeSubtaskIsRequired = (subtaskId, isRequired) => {
    const updatedTask = {...task};
    const index = updatedTask.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.subtasks[index].isRequired = isRequired;
    setTask(updatedTask);
  };

  const removeSubtask = (subtaskId) => {
    const updatedTask = {...task};
    updatedTask.subtasks.splice(
      updatedTask.subtasks.findIndex(
        (subtask) => subtask.localId === subtaskId,
      ),
      1,
    );
    setTask(updatedTask);
  };

  function goAssetSelection() {
    navigation.push('AssetSelectionScreen', {
      previousRouteName: 'TaskCreationScreen',
    });
  }

  const finishCreation = () => {
    if (!task.name || !task.culturalAsset) {
      ToastAndroid.show(
        'Es muss ein Name und ein zugehöriges Kulturgut gewählt werden!',
        ToastAndroid.SHORT,
      );
      return;
    }

    // Adjust data format for backend
    task.culturalAsset = {id: task.culturalAsset.id};
    task.subtasks.forEach((subtask) => {
      delete subtask.localId;
    });
    task.subtasks.forEach((subtask) => {
      delete subtask.task;
    });

    if (screenType === 'update') {
      console.log('Updating task:', task);
      putTask(task.id, task);
    } else {
      console.log('Creating task:', task);
      postTask(task);
    }
  };

  if (!asset) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput label="Name" value={task.name} onChangeText={onChangeName} />
      <TextInput
        label="Beschreibung"
        value={task.description}
        onChangeText={onChangeDescription}
      />
      <TextInput
        label="Empfohlene Helferanzahl"
        keyboardType="number-pad"
        value={task.recommendedHelperUsers.toString()}
        onChangeText={onChangeRecommendedHelperUsers}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goAssetSelection}
        />
      </ListActions>
      <FancyList
        title="Kulturgut"
        placeholder="Kein Kulturgut vorhanden"
        data={asset}
        extraData={{removeCallback: removeCulturalAsset}}
        component={CulturalAssetCreationListItem}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={addSubtask}
        />
      </ListActions>
      <FancyList
        title="Teilaufgaben"
        placeholder="Keine Teilaufgaben vorhanden"
        data={task.subtasks}
        extraData={{
          removeCallback: removeSubtask,
          changeTextCallback: onChangeSubtaskText,
          changeIsRequiredCallback: onChangeSubtaskIsRequired,
        }}
        component={SubtaskCreationListItem}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={finishCreation}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
