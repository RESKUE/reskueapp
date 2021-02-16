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
import {subtaskData} from '../../../testdata';
import ListActions from '../../components/ListActions';

export default function TaskCreationScreen({navigation}) {
  const {colors} = useTheme();
  const [task, setTask] = React.useState({
    name: '',
    description: '',
    tags: ['rescue'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 2,
    subtasks: subtaskData,
    culturalAsset: {id: 1},
    helper: [{}],
    contact: {},
  });

  const onChangeName = (name) => {
    const updatedTask = {task};
    updatedTask.name = name;
    updatedTask.subtasks = task.subtasks;
    setTask(updatedTask);
  };
  const onChangeDescription = (description) => {
    const updatedTask = {task};
    updatedTask.description = description;
    updatedTask.subtasks = task.subtasks;
    setTask(updatedTask);
  };

  const addSubtask = () => console.log('Added subtask');
  const removeSubtask = () => console.log('Removed subtask');

  const finishCreation = () => navigation.goBack();

  return (
    <Scaffold>
      <TextInput label="Name" value={task.name} onChangeText={onChangeName} />
      <TextInput
        label="Beschreibung"
        value={task.description}
        onChangeParent={onChangeDescription}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={addSubtask}
        />
        <IconButton
          color={colors.primary}
          icon="trash-can-outline"
          onPress={removeSubtask}
        />
      </ListActions>
      <Divider style={styles.dividerStyle} />
      <FancyList
        title="Teilaufgaben"
        data={task.subtasks}
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
