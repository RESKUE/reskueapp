import React from 'react';
import Scaffold from '../../components/baseComponents/Scaffold';
import MediaListItem from '../../components/listItems/mediaListItems/MediaListItem';
import useAllMedia from '../../handlers/AllMediaHook';
import {FancyGrid, LoadingIndicator} from '@ilt-pse/react-native-kueres';

export default function MediaListScreen() {
  const {result, requestAllMedia} = useAllMedia();

  React.useEffect(() => {
    requestAllMedia();
  }, [requestAllMedia]);

  if (result === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <FancyGrid dataList={result.data} component={MediaListItem} />
    </Scaffold>
  );
}
