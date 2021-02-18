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

  const onChangeName = (name) => {
    const updatedTask = task;
    updatedTask.data.name = name;
    setTask(updatedTask);
  };
  const onChangeDescription = (description) => {
    const updatedTask = task;
    updatedTask.data.description = description;
    setTask(updatedTask);
  };

  const addSubtask = () => {
    const emptySubtask = {
      state: 0,
      text: '',
      isRequired: false,
    };
    const updatedTask = new Task(task.data);
    updatedTask.data.subtasks.push(emptySubtask);
    setTask(updatedTask);
    console.log(task.data.subtasks);
    console.log(updatedTask.data.subtasks);
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
