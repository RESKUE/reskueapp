import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MediaType} from '@ilt-pse/react-native-kueres';

export default function MediaListItem({data}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const bg = {backgroundColor: colors.primary};
  const type = MediaType.fromMime(data.mimeType);
  const icon = MediaType.nameIcon(type);

  function onPress() {
    navigation.push('MediaDetailScreen', {id: data.id});
  }

  return (
    <TouchableRipple style={[styles.item, bg]} onPress={onPress}>
      <View>
        <Icon style={styles.half} name={icon} size={36} />
        <Text style={styles.half}>{data.altText}</Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  half: {
    height: '50%',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
