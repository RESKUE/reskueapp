import React from 'react';
import {FancyGrid, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import {useFocusEffect} from '@react-navigation/native';
import {IconButton, useTheme} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import MediaListItem from '../../components/listItems/mediaListItems/MediaListItem';
import ListActions from '../../components/ListActions';
import useMedias from '../../handlers/MediasHook';
import useRoles from '../../handlers/RolesHook';
import useAsset from '../../handlers/AssetHook';

export default function MediaListScreen({navigation, route}) {
  const {result, get} = useMedias();
  const {result: assetResult, requestAsset} = useAsset();
  const {put: putAsset} = useAsset();
  const {isAdmin} = useRoles();
  const {colors} = useTheme();
  const assetId = route.params?.assetId;
  const mediaId = route.params?.mediaId;
  const mediaUrl = `culturalAsset/${assetId}/media`;

  const linkMedia = React.useCallback(() => {
    // Unfortunately the backend requires a separate step to link an media
    // upload with a cultural asset. This creates all sorts of issues and
    // should definitely be changed.
    // Additionaly media can only be linked by updating a cultural asset
    // entities media array. This obviously creates rance conditions between
    // clients. This should also be changed.
    const mediaArray = assetResult?.data?.media ?? [];
    const updatedMediaArray = mediaArray.concat([{id: mediaId}]);
    const data = {media: updatedMediaArray};
    putAsset(assetId, data);
  }, [assetResult, mediaId, assetId, putAsset]);

  useFocusEffect(
    React.useCallback(() => {
      get(mediaUrl);
      requestAsset(assetId);
    }, [get, mediaUrl, requestAsset, assetId]),
  );

  React.useEffect(() => {
    if (mediaId) {
      linkMedia();
    }
  }, [mediaId, linkMedia]);

  if (!result) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      {isAdmin && (
        <ListActions>
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={openMediaCreationScreen}
          />
        </ListActions>
      )}
      <FancyGrid
        dataList={result.data?.content ?? []}
        component={MediaListItem}
      />
    </Scaffold>
  );

  function openMediaCreationScreen() {
    navigation.navigate('MediaCreationScreen', {
      previousRouteName: 'MediaListScreen',
    });
  }
}
