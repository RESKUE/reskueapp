import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import TaskListItem from '../../components/listItems/TaskListItem';
import {taskData} from '../../../testdata';
import ListActions from '../../components/ListActions';

export default function TaskListScreen({navigation}) {
  const goGroupCreation = () => navigation.push('TaskCreationScreen');
  const {colors} = useTheme();

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goGroupCreation}
        />
      </ListActions>
      <FancyList title="Aufgaben" data={taskData} component={TaskListItem} />
    </Scaffold>
  );
}
