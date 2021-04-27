import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme, IconButton} from 'react-native-paper';
import {
  usePolling,
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import ListActions from '../../components/ListActions';
import Scaffold from '../../components/baseComponents/Scaffold';
import NotificationListItem from '../../components/listItems/NotificationListItem';
import useNotifications from '../../handlers/NotificationsHook';

export default function NotificationListScreen({navigation}) {
  const {result, setQuery, get} = useNotifications();
  const {colors} = useTheme();
  usePolling(4000, get);

  useFocusEffect(
    React.useCallback(() => {
      get();
    }, [get]),
  );

  if (!result) {
    <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="title" operation="~">
          <SortingButton>
            <SortingOption field="title" label="Titel" />
            <SortingOption field="id" label="Neuheit" />
          </SortingButton>
        </SearchBar>
      </SearchProvider>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => get()}
        />
      </ListActions>
      <FancyList
        title="Benachrichtigungen"
        placeholder="Keine Benachrichtigungen"
        data={result?.data?.content ?? []}
        component={NotificationListItem}
      />
    </Scaffold>
  );
}
