import React from 'react';
import {LoadingIndicator} from '@ilt-pse/react-native-kueres';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  TextInput,
  IconButton,
  Divider,
  Text,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import CommentListItem from '../../components/listItems/mediaListItems/CommentListItem';
import Scaffold from '../../components/baseComponents/Scaffold';
import useComments from '../../handlers/CommentsHook';
import useComment from '../../handlers/CommentHook';
import useMedia from '../../handlers/MediaHook';

export default function CommentListScreen({route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [text, setText] = React.useState();
  const [file, setFile] = React.useState();
  const {result: commentsResult, get: getComments} = useComments();
  const {post: postComment} = useComment();
  const {post: postMedia} = useMedia();
  const {colors} = useTheme();
  const assetId = route.params.assetId;
  const comments = commentsResult?.data?.content ?? [];

  const refresh = React.useCallback(() => {
    getComments(`/culturalAsset/${assetId}/comments`);
  }, [getComments, assetId]);

  useFocusEffect(refresh);

  if (!commentsResult) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Scaffold>
        {comments.map((data, key) => {
          return <CommentListItem key={key} data={data} />;
        })}
      </Scaffold>
      {file && (
        <View>
          <Divider />
          <View style={styles.attachment} dense={true} editable={false}>
            <Text>{file?.name ?? 'Anhang'}</Text>
            <IconButton
              icon="close"
              size={20}
              color={colors.primary}
              onPress={removeFile}
              style={styles.remove}
              disabled={submitting}
            />
          </View>
        </View>
      )}
      <View>
        <Divider />
        <View style={styles.controls}>
          <TextInput
            style={styles.input}
            label="Kommentar"
            onChangeText={setText}
            multiline={true}
            value={text}
          />
          <View style={styles.buttons}>
            <IconButton
              icon="send"
              color={colors.primary}
              onPress={send}
              disabled={!isFormValid() || submitting}
            />
            <IconButton
              icon="paperclip"
              color={colors.primary}
              onPress={pickFile}
              disabled={submitting}
            />
          </View>
        </View>
      </View>
    </>
  );

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

  function removeFile() {
    setFile(null);
  }

  async function uploadMedia() {
    const data = new FormData();
    data.append('file', file);
    const result = await postMedia(data);
    return result?.data ?? null;
  }

  async function createComment(mediaId) {
    const data = {
      text: text,
      commentCulturalAsset: {id: assetId},
    };
    if (mediaId) {
      data.media = [{id: mediaId}];
    }
    return await postComment('comment/autoAuthor', data);
  }

  async function send() {
    setSubmitting(true);
    const mediaId = file ? await uploadMedia() : null;
    const result = await createComment(mediaId);
    if (result && result.error === null) {
      setText(null);
      setFile(null);
    }
    refresh();
    setSubmitting(false);
  }

  function isFormValid() {
    return !!text;
  }
}

const styles = StyleSheet.create({
  attachment: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 12,
  },
  remove: {
    margin: 0,
  },
  controls: {
    flexDirection: 'row',
    position: 'relative',
  },
  input: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
});
