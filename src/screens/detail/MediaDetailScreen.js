import React from 'react';
import {MediaType, MediaViewer} from '@ilt-pse/react-native-kueres';
import {useTheme} from 'react-native-paper';
import appConfig from '../../../app.json';

export default function MediaDetailScreen({route}) {
  const {colors} = useTheme();
  const mediaId = route.params.mediaId;
  const mimeType = route.params.mimeType;
  const type = MediaType.fromMime(mimeType);
  const uri = `${appConfig.rest.baseUrl}/media/${mediaId}`;

  return (
    <MediaViewer
      uri={uri}
      type={type}
      fgColor={colors.highlightFG}
      bgColor={colors.highlightBG}
    />
  );
}
