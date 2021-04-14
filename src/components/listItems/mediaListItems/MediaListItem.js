import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MediaType} from '@ilt-pse/react-native-kueres';

export default function MediaListItem({testID, data}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const bg = {backgroundColor: colors.primary};
  const type = MediaType.fromMime(data.mimeType);
  const icon = MediaType.nameIcon(type);

  const altText = data.altText.substring(0, 24);
  const isAltTextTrimmed = data.altText.length > altText.length;

  return (
    <TouchableRipple
      testID={testID}
      style={[styles.item, bg]}
      onPress={onPress}>
      <View>
        <Icon style={styles.half} name={icon} size={36} />
        <Text style={styles.half}>
          {altText}
          {isAltTextTrimmed ? '...' : ''}
        </Text>
      </View>
    </TouchableRipple>
  );

  function onPress() {
    navigation.navigate({
      name: 'MediaDetailScreen',
      key: data.id,
      params: {mediaId: data.id, mimeType: data.mimeType},
    });
  }
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
