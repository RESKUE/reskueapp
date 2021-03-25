import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {
  LoadingIndicator,
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserSelectionListItem from '../../components/listItems/UserSelectionListItem';
import ListActions from '../../components/ListActions';
import useUsers from '../../handlers/UsersHook';

export default function UserSelectionListScreen() {
  const {colors} = useTheme();
  const {requestUsers, setQuery, result: userResult} = useUsers();

  React.useEffect(() => {
    requestUsers();
  }, [requestUsers]);

  if (userResult === null) {
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
          onPress={() => requestUsers()}
        />
      </ListActions>
      <FancyList
        title="Wähle Mitglied"
        placeholder="Noch keine Mitglieder gewählt"
        data={userResult.data?.content || []}
        component={UserSelectionListItem}
      />
    </Scaffold>
  );
}
