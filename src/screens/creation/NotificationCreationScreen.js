import React from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {FancyToggle} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import useNotification from '../../handlers/NotificationHook';

export default function NotificationCreationScreen({navigation, route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [type, setType] = React.useState(1);
  const [title, setTitle] = React.useState();
  const [message, setMessage] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [asset, setAsset] = React.useState();
  const {post} = useNotification();

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

  return (
    <Scaffold>
      <FancyToggle.Row
        style={styles.spacing}
        initialValue={1}
        onSelectionChanged={setType}>
        <FancyToggle label="Alarm" value={2} />
        <FancyToggle label="Info" value={1} />
      </FancyToggle.Row>
      <TextInput
        label="Titel*"
        onChangeText={setTitle}
        disabled={submitting}
        style={styles.spacing}
        testID="alarmTitelInput"
      />
      <TextInput
        label="Nachricht*"
        multiline={true}
        numberOfLines={8}
        onChangeText={setMessage}
        disabled={submitting}
        style={styles.spacing}
        testID="alarmMessageInput"
      />
      <View style={[styles.spacing, styles.inputRow]}>
        <TextInput
          label="Gruppe*"
          style={styles.inputRowItem}
          editable={false}
          disabled={submitting}
          value={getGroupNames().join(', ')}
          right={
            <TextInput.Icon
              name="select-group"
              onPress={openGroupSelection}
              testID="selectUserGroupButton"
            />
          }
        />
        <TextInput
          label="Kulturg??ter"
          style={styles.inputRowItem}
          editable={false}
          disabled={submitting}
          value={asset?.name ?? null}
          right={
            <TextInput.Icon
              name="select-group"
              onPress={openAssetSelection}
              testID="selectAssetButton"
            />
          }
        />
      </View>
      <Button
        disabled={!isFormValid() || submitting}
        mode="contained"
        onPress={submit}
        loading={submitting}
        testID="setAlarmButton">
        Senden
      </Button>
    </Scaffold>
  );

  function isFormValid() {
    return !!title && !!message && groups.length > 0;
  }

  function getGroupNames() {
    return groups.map((group) => group.name ?? '');
  }

  function openAssetSelection() {
    navigation.navigate('AssetSelectionScreen', {
      previousRouteName: 'NotificationCreationScreen',
    });
  }

  function openGroupSelection() {
    navigation.navigate('GroupSelectionScreen', {
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
      type: type,
    };
    if (asset?.id) {
      data.entity = {id: asset.id};
    }
    return data;
  }

  async function submit() {
    setSubmitting(true);
    const result = await post(getData());
    if (result?.data) {
      navigation.goBack();
    } else {
      ToastAndroid.show('Erstellung fehlgeschlagen!', ToastAndroid.SHORT);
      setSubmitting(false);
    }
  }
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginRight: -16,
  },
  inputRowItem: {
    flex: 1,
    marginRight: 16,
  },
});
