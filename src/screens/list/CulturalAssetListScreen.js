import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme, IconButton} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import ListActions from '../../components/ListActions';
import useAssets from '../../handlers/AssetsHook';
import useRoles from '../../handlers/RolesHook';
import {Priorities} from '../../models/CulturalAsset';
import {
  FancyList,
  SearchBar,
  FilteringButton,
  SortingButton,
  SortingOption,
  RadioFilteringOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');
  const {colors} = useTheme();
  const {result, setQuery, requestAssets} = useAssets();
  const {isAdmin} = useRoles();

  useFocusEffect(
    React.useCallback(() => {
      requestAssets();
    }, [requestAssets]),
  );

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="name" operation="~">
          <FilteringButton>
            <RadioFilteringOption
              field="isEndangered"
              operation="="
              options={[
                {name: 'Egal', value: null},
                {name: 'Nein', value: 0},
                {name: 'Ja', value: 1},
              ]}
              label="In Gefahr"
            />
            <RadioFilteringOption
              field="level"
              operation="="
              options={[
                {name: 'Alle', value: null},
                {name: '0', value: 0},
                {name: '1', value: 1},
                {name: '2', value: 2},
                {name: '3', value: 3},
              ]}
              label="Ebene"
            />
            <RadioFilteringOption
              field="priority"
              operation="="
              options={[{name: 'Alle', value: null}].concat(Priorities)}
              label="Priorität"
            />
          </FilteringButton>
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
        {isAdmin && (
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={goAssetCreation}
            testID="assetListScreenAddButton"
          />
        )}
      </ListActions>
      <FancyList
        title="Kulturgüter"
        placeholder="Keine Kulturgüter vorhanden"
        data={result?.data?.content || []}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
