import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {
  FancyList,
  LoadingIndicator,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetSelectionListItem from '../../components/listItems/CulturalAssetSelectionListItem';
import ListActions from '../../components/ListActions';
import useAssets from '../../handlers/AssetsHook';

export default function CulturalAssetSelectionListScreen({navigation, route}) {
  const {colors} = useTheme();
  const {requestAssets, setQuery, result: assetResult} = useAssets();

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
    requestAssets();
  }, [requestAssets]);

  if (assetResult === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="name" operation="~">
          <SortingButton>
            <SortingOption field="name" label="Name" />
            <SortingOption field="priority" label="Priorität" />
          </SortingButton>
        </SearchBar>
      </SearchProvider>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestAssets()}
        />
      </ListActions>
      <FancyList
        title={getTitle(selectionType)}
        data={assetResult?.data?.content}
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
