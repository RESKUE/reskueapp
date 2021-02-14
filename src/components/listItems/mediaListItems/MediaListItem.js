import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MediaType} from "@ilt-pse/react-native-kueres";

export default function MediaListItem({data}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const bg = {backgroundColor: colors.primary};

  function onPress() {
    navigation.push('MediaDetailScreen', {id: data.id});
  }

  return (
    <TouchableRipple style={[styles.item, bg]} onPress={onPress}>
      <View>
        <Icon
          style={styles.half}
          name={getIconFromMime(data.mimeType)}
          size={36}
        />
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

function getIconFromMime(mime) {
  const type = MediaType.fromMime(mime);
  switch (type) {
    case MediaType.image:
      return 'file-image-outline';
    case MediaType.video:
      return 'file-video-outline';
    case MediaType.audio:
      return 'file-music-outline';
    default:
      return 'file-question-outline';
  }
}
