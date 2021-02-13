import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetParentSelectionListItem from '../../components/listItems/CulturalAssetParentSelectionListItem';
import CulturalAssetChildSelectionListItem from '../../components/listItems/CulturalAssetChildSelectionListItem';
import ListActions from '../../components/ListActions';
import useAllAssets from '../../handlers/AllAssetsHook';

export default function CulturalAssetSelectionListScreen({navigation, route}) {
  const {colors} = useTheme();
  const {requestAllAssets, result} = useAllAssets();

  const selectionType = route.params.selectionType;

  const title = selectionType === 'parent' ? 'Obergruppe' : 'Teil-Kulturgut';
  const component =
    selectionType === 'parent'
      ? CulturalAssetParentSelectionListItem
      : CulturalAssetChildSelectionListItem;

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
      <FancyList title={title} data={result?.data} component={component} />
    </Scaffold>
  );
}
