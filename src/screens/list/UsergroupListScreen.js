import React from 'react';
import {StyleSheet, View} from 'react-native';
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
import useUserMe from '../../handlers/UserMeHook';
import useUsergroups from '../../handlers/UsergroupsHook';
import useRoles from '../../handlers/RolesHook';

export default function UsergroupListScreen({navigation}) {
  const goGroupCreation = () => navigation.push('UsergroupCreationScreen');
  const {colors} = useTheme();
  const {requestUserMe, result: userResult} = useUserMe();
  const {isAdmin} = useRoles();
  const {
    result,
    myUsergroupResult,
    setQuery,
    requestUsergroups,
    requestMyUsergroups,
  } = useUsergroups();

  useFocusEffect(
    React.useCallback(() => {
      requestUsergroups();
      requestUserMe();
    }, [requestUsergroups, requestUserMe]),
  );

  React.useEffect(() => {
    if (userResult?.data) {
      requestMyUsergroups(userResult.data.id);
    }
  }, [requestMyUsergroups, userResult]);

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
      <View style={styles.content}>
        <FancyList
          title="Meine Gruppen"
          placeholder="Du bist in keiner Gruppe"
          data={myUsergroupResult?.data?.content ?? []}
          component={UsergroupListItem}
        />
      </View>
      {isAdmin && (
        <FancyList
          title="Gruppen"
          placeholder="Keine Gruppen vorhanden"
          data={result?.data?.content || []}
          component={UsergroupListItem}
        />
      )}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 16,
  },
});
