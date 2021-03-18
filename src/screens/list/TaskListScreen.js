import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import useTasks from '../../handlers/TasksHook';
import {useFocusEffect} from '@react-navigation/native';
import useRoles from '../../handlers/RolesHook';

export default function TaskListScreen({navigation}) {
  const goTaskCreation = () => navigation.push('TaskCreationScreen');
  const {colors} = useTheme();
  const {isAdmin} = useRoles();
  const {result, setQuery, requestTasks} = useTasks();

  useFocusEffect(
    React.useCallback(() => {
      requestTasks();
    }, [requestTasks]),
  );

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="name" operation="~">
          <SortingButton>
            <SortingOption field="name" label="Name" />
          </SortingButton>
        </SearchBar>
      </SearchProvider>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestTasks()}
        />
        {isAdmin && (
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={goTaskCreation}
          />
        )}
      </ListActions>
      <FancyList
        title="Aufgaben"
        data={result?.data?.content || []}
        component={TaskListItem}
      />
    </Scaffold>
  );
}
