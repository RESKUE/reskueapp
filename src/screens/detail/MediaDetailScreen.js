import React from 'react';
import Config from 'react-native-config';
import {MediaType, MediaViewer} from '@ilt-pse/react-native-kueres';
import {useTheme} from 'react-native-paper';

export default function MediaDetailScreen({route}) {
  const {colors} = useTheme();
  const mediaId = route.params.mediaId;
  const mimeType = route.params.mimeType;
  const type = MediaType.fromMime(mimeType);
  const uri = `${Config.APP_REST_BASE_URL}/media/${mediaId}`;

  return (
    <MediaViewer
      uri={uri}
      type={type}
      fgColor={colors.highlightFG}
      bgColor={colors.highlightBG}
    />
  );
}
