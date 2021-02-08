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

  React.useEffect(() => {
    console.log(result.source, 'response received');
  }, [result]);

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
        title="Kulturgüter"
        data={result.data}
        component={CulturalAssetSelectionListItem}
      />
    </Scaffold>
  );
}
