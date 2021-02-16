import React from 'react';
import {
  MediaType,
  MediaViewer,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import useMedia from '../../handlers/MediaHook';
import {useTheme} from 'react-native-paper';

export default function MediaDetailScreen({route}) {
  const {colors} = useTheme();
  const {result, requestMedia} = useMedia(route.params.id);

  React.useEffect(() => {
    requestMedia();
  }, [requestMedia]);

  if (result === null) {
    return <LoadingIndicator />;
  }

  const type = MediaType.fromMime(result.data.mimeType);
  const uri = `https://lunaless.com/reskue/media/${result.data.id}`;

  return (
    <MediaViewer
      uri={uri}
      type={type}
      fgColor={colors.highlightFG}
      bgColor={colors.highlightBG}
    />
  );
}
