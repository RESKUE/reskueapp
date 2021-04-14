import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Paragraph, Caption, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useRoles from '../../../handlers/RolesHook';

export default function CommentListItem({data, extraData}) {
  const [anchor, setAnchor] = React.useState(null);
  const {isAdmin} = useRoles();
  const navigation = useNavigation();
  const media = data?.media ?? [];
  const authorId = data?.author?.id ?? -1;
  const iAmAuthor = authorId === extraData?.viewerId;
  const canDelete = isAdmin || iAmAuthor;

  return (
    <>
      <Card style={styles.comment} onLongPress={showMenu}>
        <Card.Content>
          <View style={styles.header}>
            <Caption>{data?.author?.name ?? 'Unbekannt'}</Caption>
            <Caption>{reprDateTime(data?.createdAt)} Uhr</Caption>
          </View>
          <Paragraph>{data?.text}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {media.map((mediaItem, key) => {
            const altText = (mediaItem?.altText ?? '') || 'Anhang';
            return (
              <Button
                key={key}
                onPress={() => openMedia(mediaItem?.id, mediaItem?.mimeType)}>
                {altText}
              </Button>
            );
          })}
        </Card.Actions>
      </Card>
      <Menu visible={!!anchor} onDismiss={hideMenu} anchor={anchor}>
        <Menu.Item disabled={!canDelete} onPress={del} title="Delete" />
      </Menu>
    </>
  );

  function openMedia(mediaId, mimeType) {
    navigation.navigate({
      name: 'MediaDetailScreen',
      key: mediaId,
      params: {mediaId: mediaId, mimeType: mimeType},
    });
  }

  function showMenu(event) {
    setAnchor({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});
  }

  function hideMenu() {
    setAnchor(null);
  }

  function del() {
    hideMenu();
    extraData.deletionCallback(data.id);
  }
}

function reprDateTime(dateTime) {
  return moment(dateTime).format('MM.DD.YYYY HH:mm');
}

const styles = StyleSheet.create({
  comment: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
