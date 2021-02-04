import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import MyTaskListItem from '../../components/listItems/MyTaskListItem';
import {taskData} from '../../../testdata';

export default function MyTaskListScreen() {
  return (
    <Scaffold>
      <FancyList
        title="Meine Aufgaben"
        data={taskData}
        component={MyTaskListItem}
      />
    </Scaffold>
  );
}
