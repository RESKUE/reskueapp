import React from 'react';
import {
  MediaType,
  MediaViewer,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import useMedia from '../../handlers/MediaHook';

export default function MediaDetailScreen({route}) {
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
    <MediaViewer uri={uri} type={type} fgColor="#ffffff" bgColor="#02d487" />
  );
}
