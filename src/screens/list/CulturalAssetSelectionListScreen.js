import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetSelectionListItem from '../../components/listItems/CulturalAssetSelectionListItem';
import ListActions from '../../components/ListActions';
import useAllAssets from '../../handlers/AllAssetsHook';

export default function CulturalAssetSelectionListScreen({navigation, route}) {
  const {colors} = useTheme();
  const {requestAllAssets, result} = useAllAssets();

  const selectionType = route.params.selectionType;

  const getTitle = () => {
    if (selectionType === 'parent') {
      return 'Obergruppe';
    } else if (selectionType === 'child') {
      return 'Teil-Kulturgut';
    } else {
      return 'Kulturgut';
    }
  };

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
        title={getTitle()}
        data={result?.data}
        extraData={{callback: getCallback()}}
        component={CulturalAssetSelectionListItem}
      />
    </Scaffold>
  );
}
