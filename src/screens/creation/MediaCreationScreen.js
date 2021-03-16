import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Scaffold from '../../components/baseComponents/Scaffold';
import useMedia from '../../handlers/MediaHook';

export default function MediaCreationScreen({navigation, route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [altText, setAltText] = React.useState();
  const [fileURI, setFileURI] = React.useState();
  const [fileType, setFileType] = React.useState();
  const [fileName, setFileName] = React.useState();
  const {result, post} = useMedia();
  const path = 'media';
  const previousRouteName = route.params.previousRouteName;

  React.useEffect(() => {
    if (result?.data) {
      navigation.navigate(previousRouteName, {
        mediaId: result.data,
      });
    } else {
      setSubmitting(false);
    }
  }, [result, navigation, previousRouteName]);

  return (
    <Scaffold>
      <TextInput
        label="Datei"
        style={styles.spacing}
        editable={false}
        disabled={submitting}
        value={fileName}
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
    return !!fileURI;
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
        setFileURI(res.uri);
        setFileType(res.type);
        setFileName(res.name);
      }
    } catch (err) {}
  }

  function getData() {
    const data = new FormData();
    data.append('altText', altText);
    data.append('file', {uri: fileURI, type: fileType, name: fileName});
    return data;
  }

  async function submit() {
    setSubmitting(true);
    await post(path, getData());
  }
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
  },
});
