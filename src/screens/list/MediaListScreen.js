import React from 'react';
import Scaffold from '../../components/baseComponents/Scaffold';
import MediaListItem from '../../components/listItems/mediaListItems/MediaListItem';
import useMedias from '../../handlers/MediasHook';
import {FancyGrid, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import {useFocusEffect} from '@react-navigation/native';

export default function MediaListScreen() {
  const {result, requestMedias} = useMedias();

  useFocusEffect(
    React.useCallback(() => {
      requestMedias();
    }, [requestMedias]),
  );

  if (result === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <FancyGrid dataList={result.data} component={MediaListItem} />
    </Scaffold>
  );
}
