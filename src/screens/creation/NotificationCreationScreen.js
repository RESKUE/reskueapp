import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import useNotification from '../../handlers/NotificationHook';

export default function NotificationCreationScreen({navigation, route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [message, setMessage] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [asset, setAsset] = React.useState();
  const {result, post} = useNotification();

  React.useEffect(() => {
    const selectedAsset = route.params?.selectedAsset;
    const selectedGroups = route.params?.selectedGroups;
    if (selectedAsset) {
      setAsset(selectedAsset);
    }
    if (selectedGroups) {
      setGroups(selectedGroups);
    }
  }, [route]);

  React.useEffect(() => {
    if (result?.data) {
      navigation.goBack();
    } else {
      setSubmitting(false);
    }
  }, [result, navigation]);

  return (
    <Scaffold>
      <TextInput
        label="Titel*"
        onChangeText={setTitle}
        disabled={submitting}
        style={styles.spacing}
      />
      <TextInput
        label="Nachricht*"
        multiline={true}
        numberOfLines={8}
        onChangeText={setMessage}
        disabled={submitting}
        style={styles.spacing}
      />
      <TextInput
        label="Kulturgutgruppe"
        style={styles.spacing}
        editable={false}
        disabled={submitting}
        value={asset?.name ?? null}
        right={
          <TextInput.Icon name="select-group" onPress={openAssetSelection} />
        }
      />
      <TextInput
        label="Benutzergruppen"
        style={styles.spacing}
        editable={false}
        disabled={submitting}
        value={getGroupNames().join(', ')}
        right={
          <TextInput.Icon name="select-group" onPress={openGroupSelection} />
        }
      />
      <Button
        disabled={!isFormValid() || submitting}
        mode="contained"
        onPress={submit}
        loading={submitting}>
        Alarm auslösen
      </Button>
    </Scaffold>
  );

  function isFormValid() {
    return !!title && !!message;
  }

  function getGroupNames() {
    return groups.map((group) => group.name ?? '');
  }

  function openAssetSelection() {
    navigation.push('AssetSelectionScreen', {
      previousRouteName: 'NotificationCreationScreen',
    });
  }

  function openGroupSelection() {
    navigation.push('GroupSelectionScreen', {
      previousRouteName: 'NotificationCreationScreen',
    });
  }

  function getData() {
    const receivers = groups.map((g) => {
      return {id: g.id};
    });
    var data = {
      title: title,
      message: message,
      receivers: receivers,
    };
    if (asset?.id) {
      data.entity = {id: asset.id};
    }
    return data;
  }

  async function submit() {
    setSubmitting(true);
    post(getData());
  }
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
  },
});
