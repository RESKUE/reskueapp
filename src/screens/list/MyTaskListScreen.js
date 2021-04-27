import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme, IconButton} from 'react-native-paper';
import {
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import ListActions from '../../components/ListActions';
import Scaffold from '../../components/baseComponents/Scaffold';
import TaskListItem from '../../components/listItems/TaskListItem';
import useTasks from '../../handlers/TasksHook';
import useMe from '../../handlers/UserMeHook';

export default function MyTaskListScreen() {
  const {colors} = useTheme();
  const {result, setQuery, requestUserTasks} = useTasks();
  const {requestUserMe} = useMe();
  const content = result?.data?.content;

  const fetchData = React.useCallback(async () => {
    const userResult = await requestUserMe();
    const userId = userResult?.data?.id ?? null;
    if (userId !== null) {
      requestUserTasks(userId);
    }
  }, [requestUserMe, requestUserTasks]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  if (!result) {
    return <LoadingIndicator />;
  }

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
          onPress={() => requestUserTasks()}
        />
      </ListActions>
      <FancyList
        title="Meine Aufgaben"
        placeholder="Keine Aufgaben vorhanden"
        data={content ?? []}
        component={TaskListItem}
      />
    </Scaffold>
  );
}
