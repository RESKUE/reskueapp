import React from 'react';
import {StyleSheet} from 'react-native';
import {
  useTheme,
  IconButton,
  Button,
  Divider,
  TextInput,
} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskCreationListItem from '../../components/listItems/SubtaskCreationListItem';
import ListActions from '../../components/ListActions';
import Task from '../../models/Task';

export default function TaskCreationScreen({navigation}) {
  const {colors} = useTheme();
  const emptyTask = {
    name: '',
    description: '',
    tags: ['rescue'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 2,
    subtasks: [],
    culturalAsset: {id: 1},
    helper: [{}],
    contact: {},
  };
  const [task, setTask] = React.useState(new Task(emptyTask));
  //const [asset, setAsset] = React.useState([]);
  const [subtaskIdCounter, setSubtaskIdCounter] = React.useState(0);

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

  const onChangeSubtaskText = (subtaskId, text) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId,
    );
    updatedTask.data.subtasks[index].text = text;
    setTask(updatedTask);
  };

  const onChangeSubtaskIsRequired = (subtaskId, isRequired) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId,
    );
    updatedTask.data.subtasks[index].isRequired = isRequired;
    setTask(updatedTask);
  };

  const removeSubtask = (subtaskId) => {
    const updatedTask = new Task(task.data);
    updatedTask.data.subtasks.splice(
      updatedTask.data.subtasks.findIndex(
        (subtask) => subtask.id === subtaskId,
      ),
      1,
    );
    setTask(updatedTask);
  };

  const finishCreation = () => {
    console.log(task);
    navigation.goBack();
  };

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
        onChangeParent={onChangeDescription}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={addSubtask}
        />
      </ListActions>
      <Divider style={styles.dividerStyle} />
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

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
