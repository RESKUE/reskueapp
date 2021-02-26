import React from 'react';
import {StyleSheet} from 'react-native';
import {List, IconButton, Button, useTheme} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import useUsergroups from '../../handlers/UsergroupsHook';
import {
  ErrorIndicator,
  FancyList,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';

export default function GroupSelectionScreen({navigation, route}) {
  const [selection, setSelection] = React.useState([]);
  const {result, requestUsergroups} = useUsergroups();
  const {colors} = useTheme();
  const content = result?.data?.content;

  console.log('SELECTION', selection);

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
      <FancyList
        title="Wähle eine Benutzergruppe"
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
