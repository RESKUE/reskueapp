import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Paragraph, Caption} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function CommentListItem({data}) {
  const navigation = useNavigation();
  const media = data?.media ?? [];

  return (
    <Card style={styles.comment}>
      <Card.Content>
        <View style={styles.header}>
          <Caption>{data?.author?.name ?? "Unbekannt"}</Caption>
          <Caption>{reprDateTime(data?.createdAt)} Uhr</Caption>
        </View>
        <Paragraph>{data?.text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {media.map((mediaItem, key) => {
          const altText = (mediaItem?.altText ?? '') || 'Anhang';
          return <Button key={key} onPress={() => openMedia(mediaItem?.id, mediaItem?.mimeType)}>{altText}</Button>;
        })}
      </Card.Actions>
    </Card>
  );

  function openMedia(mediaId, mimeType) {
    navigation.push('MediaDetailScreen', {
      mediaId: mediaId,
      mimeType: mimeType,
    });
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
