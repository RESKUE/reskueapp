import React from 'react';
import {StyleSheet} from 'react-native';
import {List, IconButton, Button, useTheme} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import useUsergroups from '../../handlers/UsergroupsHook';
import ListActions from '../../components/ListActions';
import {
  ErrorIndicator,
  LoadingIndicator,
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';

export default function GroupSelectionScreen({navigation, route}) {
  const [selection, setSelection] = React.useState([]);
  const {result, setQuery, requestUsergroups} = useUsergroups();
  const {colors} = useTheme();
  const content = result?.data?.content;

  React.useEffect(() => {
    requestUsergroups();
  }, [requestUsergroups]);

  if (!result) {
    return <LoadingIndicator />;
  }

  if (!content) {
    return <ErrorIndicator />;
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
          onPress={() => requestUsergroups()}
        />
      </ListActions>
      <FancyList
        title="Wähle eine Benutzergruppe"
        placeholer="Keine Benutzergruppe gewählt"
        data={content || []}
        component={GroupSelectionItem}
      />
      <Button style={styles.spacing} mode="contained" onPress={submit}>
        Bestätigen
      </Button>
    </Scaffold>
  );

  function GroupSelectionItem({data}) {
    return (
      <List.Item
        key={data?.id}
        title={data?.name}
        description={data?.description}
        disabled={true}
        right={(props) => (
          <IconButton
            {...props}
            icon={getIconName(data?.id)}
            color={colors.primary}
            onPress={() => toggle(data)}
          />
        )}
      />
    );
  }

  function toggle(data) {
    if (selection.some((e) => e.id === data.id)) {
      const newSelection = selection.filter((e) => e.id !== data.id);
      setSelection(newSelection);
    } else {
      const newSelection = selection.concat(data);
      setSelection(newSelection);
    }
  }

  function getIconName(id) {
    if (selection.some((e) => e.id === id)) {
      return 'checkbox-marked';
    }
    return 'checkbox-blank-outline';
  }

  function submit() {
    navigation.navigate(route.params.previousRouteName, {
      selectedGroups: Object.values(selection),
    });
  }
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: 16,
  },
});
