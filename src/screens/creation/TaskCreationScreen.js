import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {useTheme, IconButton, Button, TextInput} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskCreationListItem from '../../components/listItems/SubtaskCreationListItem';
import CulturalAssetUnpressableListItem from '../../components/listItems/CulturalAssetUnpressableListItem';
import ListActions from '../../components/ListActions';
import useAsset from '../../handlers/AssetHook';
import useTaskCreation from '../../handlers/TaskCreationHook';
import Task from '../../models/Task';

export default function TaskCreationScreen({navigation, route}) {
  const [task, setTask] = React.useState(new Task(emptyTask));
  const [asset, setAsset] = React.useState(null);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(0);

  const {colors} = useTheme();
  const {requestAsset, result: assetResult} = useAsset();
  const {postTask, taskResult} = useTaskCreation();

  React.useEffect(() => {
    const assetId = route.params?.assetId;
    if (assetId) {
      requestAsset(assetId);
    } else {
      setAsset([]);
    }
  }, [requestAsset, route.params]);

  React.useEffect(() => {
    if (assetResult?.data) {
      onChangeAsset();
    }
  }, [onChangeAsset, assetResult]);

  React.useEffect(() => {
    if (taskResult?.data != null) {
      navigation.goBack();
    } else {
      console.log(taskResult);
    }
  }, [taskResult, navigation]);

  const onChangeName = (name) => {
    const updatedTask = new Task(task.data);
    updatedTask.data.name = name;
    setTask(updatedTask);
  };
  const onChangeDescription = (description) => {
    const updatedTask = new Task(task.data);
    updatedTask.data.description = description;
    setTask(updatedTask);
  };
  const onChangeRecommendedHelperUsers = (recommendedHelperUsers) => {
    const updatedTask = new Task(task.data);
    updatedTask.data.recommendedHelperUsers = recommendedHelperUsers;
    setTask(updatedTask);
  };

  const onChangeAsset = React.useCallback(() => {
    const updatedTask = new Task(task.data);
    if (assetResult) {
      updatedTask.data.culturalAsset = assetResult.data;
      setAsset([assetResult.data]);
    }
    setTask(updatedTask);
  }, [assetResult, task.data]);

  const addSubtask = () => {
    const emptySubtask = {
      localId: subtaskIdCounter,
      state: 0,
      text: '',
      isRequired: false,
    };
    const updatedTask = new Task(task.data);
    updatedTask.data.subtasks.push(emptySubtask);
    setSubtaskIdCounter(subtaskIdCounter + 1);
    setTask(updatedTask);
  };

  const onChangeSubtaskText = (subtaskId, text) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.data.subtasks[index].text = text;
    setTask(updatedTask);
  };

  const onChangeSubtaskIsRequired = (subtaskId, isRequired) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.localId === subtaskId,
    );
    updatedTask.data.subtasks[index].isRequired = isRequired;
    setTask(updatedTask);
  };

  const removeSubtask = (subtaskId) => {
    const updatedTask = new Task(task.data);
    updatedTask.data.subtasks.splice(
      updatedTask.data.subtasks.findIndex(
        (subtask) => subtask.localId === subtaskId,
      ),
      1,
    );
    setTask(updatedTask);
  };

  const goAssetSelection = () => {
    navigation.push('CulturalAssetSelectionListScreen', {
      selectionType: 'task',
    });
  };

  const finishCreation = () => {
    if (task.data.name === '' || !task.data.culturalAsset) {
      ToastAndroid.show(
        'Es muss ein Name und ein zugehöriges Kulturgut gewählt werden!',
        ToastAndroid.SHORT,
      );
      return;
    }
    task.data.culturalAsset = {id: task.data.culturalAsset.id};

    postTask(task.data);
  };

  if (asset === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={task.data.name}
        onChangeText={onChangeName}
      />
      <TextInput
        label="Beschreibung"
        value={task.data.description}
        onChangeText={onChangeDescription}
      />
      <TextInput
        label="Empfohlene Helferanzahl"
        keyboardType="number-pad"
        value={task.data.recommendedHelperUsers}
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
        data={asset}
        component={CulturalAssetUnpressableListItem}
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
        data={task.data.subtasks}
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

const emptyTask = {
  name: '',
  description: '',
  tags: [],
  state: 0,
  subtasks: [],
  recommendedHelperUsers: '1',
};

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
