import React from 'react';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {Card, Divider, Button, Paragraph} from 'react-native-paper';
import {ErrorIndicator, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import useNotification from '../../handlers/NotificationHook';

export default function NotificationDetailScreen({navigation, route}) {
  const {result, get} = useNotification();
  const content = result?.data;

  React.useEffect(() => {
    get(route.params.id);
  }, [get, route]);

  if (!result) {
    return <LoadingIndicator />;
  }

  if (!content) {
    return <ErrorIndicator />;
  }

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title title={content?.title} subtitle={getSubtitle(content)} />
        <Divider />
        <Card.Content style={[styles.content, styles.mainContent]}>
          <Paragraph>{content?.message}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={styles.content}>
          <Paragraph>Sender: {content?.sender?.name ?? 'Unbekannt'}</Paragraph>
        </Card.Content>
      </Card>
      {content?.entity && (
        <Button style={styles.button} mode="contained" onPress={onPress}>
          Zum betroffenen Kulturgut
        </Button>
      )}
    </Scaffold>
  );

  function onPress() {
    navigation.navigate({
      name: 'CulturalAssetDetailScreen',
      key: content.entity,
      params: {id: content.entity},
    });
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

function reprType(type) {
  if (type === 1) {
    return 'Info';
  }
  if (type === 2) {
    return 'Alarm';
  }
  return 'Sonstiges';
}

function reprDate(date) {
  return moment(date).format('MM.DD.YYYY');
}

function reprTime(date) {
  return moment(date).format('HH:mm');
}

function getSubtitle(content) {
  const date = `Datum: ${reprDate(content?.sentAt)}`;
  const time = `Uhrzeit: ${reprTime(content?.sentAt)}`;
  const type = `Typ: ${reprType(content?.type)}`;
  return `${date}  |  ${time}  |  ${type}`;
}
