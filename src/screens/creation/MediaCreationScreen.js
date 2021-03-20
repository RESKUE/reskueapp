import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Scaffold from '../../components/baseComponents/Scaffold';
import useMedia from '../../handlers/MediaHook';

export default function MediaCreationScreen({navigation, route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [altText, setAltText] = React.useState();
  const [file, setFile] = React.useState();
  const {post} = useMedia();
  const previousRouteName = route.params.previousRouteName;

  return (
    <Scaffold>
      <TextInput
        label="Datei"
        style={styles.spacing}
        editable={false}
        disabled={submitting}
        value={file?.name}
        right={<TextInput.Icon name="file" onPress={pickFile} />}
      />
      <TextInput
        label="Alt text"
        onChangeText={setAltText}
        disabled={submitting}
        style={styles.spacing}
      />
      <Button
        disabled={!isFormValid() || submitting}
        mode="contained"
        onPress={submit}
        loading={submitting}>
        Hochladen
      </Button>
    </Scaffold>
  );

  function isFormValid() {
    return !!file?.uri;
  }

  async function pickFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.video,
          DocumentPicker.types.images,
        ],
      });
      if (res) {
        setFile(res);
      }
    } catch (err) {}
  }

  function getData() {
    const data = new FormData();
    data.append('altText', altText);
    data.append('file', file);
    return data;
  }

  async function submit() {
    setSubmitting(true);
    const result = await post(getData());
    if (result?.data) {
      navigation.navigate(previousRouteName, {
        mediaId: result.data,
      });
    } else {
      setSubmitting(false);
    }
  }
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
  },
});
