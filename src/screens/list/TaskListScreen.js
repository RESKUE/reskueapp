import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import TaskListItem from '../../components/listItems/TaskListItem';
import {taskData} from '../../../testdata';

export default function TaskListScreen() {
  return (
    <Scaffold>
      <FancyList title="Aufgaben" data={taskData} component={TaskListItem} />
    </Scaffold>
  );
}
