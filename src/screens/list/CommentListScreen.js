import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {
  LoadingIndicator,
  InfoIndicator,
  usePolling,
} from '@ilt-pse/react-native-kueres';
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
import useUserMe from '../../handlers/UserMeHook';
import useMedia from '../../handlers/MediaHook';

export default function CommentListScreen({route}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [text, setText] = React.useState();
  const [file, setFile] = React.useState();
  const {requestUserMe, result: me} = useUserMe();
  const {result: commentsResult, get: getComments} = useComments();
  const {post: postComment, del: deleteComment} = useComment();
  const {post: postMedia} = useMedia();
  const {colors} = useTheme();
  const assetId = route.params.assetId ?? null;
  const taskId = route.params.taskId ?? null;
  const comments = commentsResult?.data?.content ?? [];

  const refresh = React.useCallback(() => {
    if (assetId) {
      getComments(`/culturalAsset/${assetId}/comments`);
    }
    if (taskId) {
      getComments(`/task/${taskId}/comments`);
    }
  }, [getComments, assetId, taskId]);

  useFocusEffect(refresh);
  usePolling(4000, refresh);

  React.useEffect(() => {
    requestUserMe();
  }, [requestUserMe]);

  if (!commentsResult || !me) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Scaffold>
        {comments.length > 0 ? (
          <CommentsList
            comments={comments}
            viewerId={me?.data?.id}
            deletionCallback={deleteCommentAndRefresh}
          />
        ) : (
          <InfoIndicator
            icon="message-reply-text"
            text="Noch keine Kommentare"
          />
        )}
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
            testID="commentInput"
          />
          <View style={styles.buttons}>
            <IconButton
              icon="send"
              color={colors.primary}
              onPress={send}
              disabled={!isFormValid() || submitting}
              testID="send"
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
    const data = {text: text};
    if (assetId) {
      data.commentCulturalAsset = {id: assetId};
    }
    if (taskId) {
      data.commentTask = {id: taskId};
    }
    if (mediaId) {
      data.media = [{id: mediaId}];
    }
    return await postComment(data);
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

  async function deleteCommentAndRefresh(id) {
    await deleteComment(id);
    refresh();
  }
}

function CommentsList({comments, viewerId, deletionCallback}) {
  return (
    <>
      {comments.map((data, key) => {
        return (
          <CommentListItem
            key={key}
            data={data}
            extraData={{viewerId, deletionCallback}}
          />
        );
      })}
    </>
  );
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
