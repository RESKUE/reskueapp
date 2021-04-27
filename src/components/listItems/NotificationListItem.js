import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {List, TouchableRipple, useTheme} from 'react-native-paper';
import SmallChip from '../SmallChip';

export default function NotificationListItem({data, extraData}) {
  const {colors} = useTheme();

  return (
    <TouchableRipple key={data.id} onPress={() => extraData.onPress(data.id)}>
      <View>
        <List.Item
          key={data.id}
          title={data.title}
          description={data.message}
          right={getIcon}
        />
        <View style={styles.chips}>
          <SmallChip>{`Datum: ${moment(data?.sentAt).format(
            'MM.DD.YYYY',
          )}`}</SmallChip>
          <SmallChip>{`Uhrzeit: ${moment(data?.sentAt).format(
            'HH:mm',
          )}`}</SmallChip>
        </View>
      </View>
    </TouchableRipple>
  );

  function getIcon(props) {
    if (data.type === 2) {
      // Signal that this notification is an alarm
      return <List.Icon {...props} icon="alert" color={colors.redish} />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginRight: -4,
  },
});
