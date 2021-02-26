import React from 'react';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import MyTaskListItem from '../../components/listItems/MyTaskListItem';
import useTasks from '../../handlers/TasksHook';
import {useFocusEffect} from '@react-navigation/native';

export default function MyTaskListScreen() {
  const {result, requestUserTasks} = useTasks();
  const content = result?.data?.content;

  useFocusEffect(
    React.useCallback(() => {
      requestUserTasks();
    }, [requestUserTasks]),
  );

  if (!result) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <FancyList
        title="Meine Aufgaben"
        data={content ?? []}
        component={MyTaskListItem}
      />
    </Scaffold>
  );
}
