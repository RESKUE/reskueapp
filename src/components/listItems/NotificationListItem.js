import React from 'react';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {List, TouchableRipple} from 'react-native-paper';
import SmallChip from '../SmallChip';

export default function NotificationListItem({data, extraData}) {
  return (
    <TouchableRipple key={data.id} onPress={() => extraData.onPress(data.id)}>
      <View>
        <List.Item
          key={data.id}
          title={data.title}
          description={data.message}
        />
        <View style={styles.chips}>
          <SmallChip>{`Datum: ${moment(data?.sendAt).format(
            'MM.DD.YYYY',
          )}`}</SmallChip>
          <SmallChip>{`Uhrzeit: ${moment(data?.sendAt).format(
            'HH:mm',
          )}`}</SmallChip>
        </View>
      </View>
    </TouchableRipple>
  );
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
