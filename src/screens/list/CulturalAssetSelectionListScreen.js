import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetSelectionListItem from '../../components/listItems/CulturalAssetSelectionListItem';
import ListActions from '../../components/ListActions';
import useAllAssets from '../../handlers/AllAssetsHook';

export default function CulturalAssetSelectionListScreen({navigation, route}) {
  const {colors} = useTheme();
  const {requestAllAssets, result: assetResult} = useAllAssets();

  const selectionType = route.params.selectionType;

  const getCallback = () => {
    if (selectionType === 'parent') {
      return (id) => {
        navigation.navigate('CulturalAssetCreationScreen', {
          parentId: id,
        });
      };
    } else if (selectionType === 'child') {
      return (id) => {
        navigation.navigate('CulturalAssetCreationScreen', {
          childId: id,
        });
      };
    } else {
      return (id) => {
        navigation.navigate('TaskCreationScreen', {
          assetId: id,
        });
      };
    }
  };
  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  if (assetResult === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestAllAssets()}
        />
      </ListActions>
      <FancyList
        title={getTitle(selectionType)}
        data={assetResult?.data}
        extraData={{callback: getCallback()}}
        component={CulturalAssetSelectionListItem}
      />
    </Scaffold>
  );
}

function getTitle(selectionType) {
  if (selectionType === 'parent') {
    return 'Obergruppe';
  } else if (selectionType === 'child') {
    return 'Teil-Kulturgut';
  } else {
    return 'Kulturgut';
  }
}
