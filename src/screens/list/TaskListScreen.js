import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import TaskListItem from '../../components/listItems/TaskListItem';
import {taskData} from '../../../testdata';

export default function TaskListScreen({navigation}) {
  const goGroupCreation = () => navigation.push('TaskCreationScreen');

  return (
    <Scaffold>
      <View style={{flexDirection: 'row-reverse'}}>
        <Button icon="plus-circle-outline" onPress={goGroupCreation} />
      </View>
      <FancyList title="Aufgaben" data={taskData} component={TaskListItem} />
    </Scaffold>
  );
}
