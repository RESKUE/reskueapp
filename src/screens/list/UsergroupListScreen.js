import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UsergroupListItem from '../../components/listItems/UsergroupListItem';
import ListActions from '../../components/ListActions';
import useUsergroups from '../../handlers/UsergroupsHook';
import useRoles from '../../handlers/RolesHook';

export default function UsergroupListScreen({navigation}) {
  const goGroupCreation = () =>
    navigation.push('UsergroupCreationScreen', {
      screenType: 'creation',
    });
  const {colors} = useTheme();
  const {isAdmin} = useRoles();
  const {result, setQuery, requestUsergroups} = useUsergroups();

  useFocusEffect(
    React.useCallback(() => {
      requestUsergroups();
    }, [requestUsergroups]),
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
          onPress={() => requestUsergroups()}
        />
        {isAdmin && (
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={goGroupCreation}
          />
        )}
      </ListActions>
      <FancyList
        title="Gruppen"
        data={result?.data?.content || []}
        component={UsergroupListItem}
      />
    </Scaffold>
  );
}
