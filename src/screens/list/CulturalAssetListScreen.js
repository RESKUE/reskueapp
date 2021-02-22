import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import ListActions from '../../components/ListActions';
import useAllAssets from '../../handlers/AllAssetsHook';
import {Priorities} from '../../models/CulturalAsset';
import {
  FancyList,
  AuthContext,
  SearchBar,
  FilteringButton,
  SortingButton,
  SortingOption,
  RadioFilteringOption,
  SliderFilteringOption,
  ChipFilteringOption,
} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');
  const {authService} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {
    result,
    requestAllAssets,
    updateFilters,
    updateSorters,
  } = useAllAssets();

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  return (
    <Scaffold>
      <SearchBar field="name" operation="~" updateFilters={updateFilters}>
        <FilteringButton>
          <RadioFilteringOption
            updateFilters={updateFilters}
            field="endangered"
            operation="="
            options={[
              {name: 'Egal', value: null},
              {name: 'Ja', value: 0},
              {name: 'Nein', value: 1},
            ]}
            label="In Gefahr"
          />
          <SliderFilteringOption
            updateFilters={updateFilters}
            field="distance"
            operation="<"
            min={0}
            max={100}
            step={5}
            unit="km"
            label="Entfernung"
          />
          <ChipFilteringOption
            updateFilters={updateFilters}
            field="priority"
            operation="="
            options={Priorities}
            label="Priorität"
          />
        </FilteringButton>
        <SortingButton>
          <SortingOption
            updateSorters={updateSorters}
            field="name"
            label="Name"
          />
          <SortingOption
            updateSorters={updateSorters}
            field="distance"
            label="Entfernung"
          />
          <SortingOption
            updateSorters={updateSorters}
            field="tags"
            label="Priorität"
          />
        </SortingButton>
      </SearchBar>

      <ListActions>
        <IconButton
          color={colors.primary}
          icon="security"
          onPress={async () =>
            console.log('ACCESS TOKEN:', await authService.getAccessToken())
          }
        />
        <IconButton
          color={colors.primary}
          icon="key-outline"
          onPress={() => authService.refresh()}
        />
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestAllAssets()}
        />
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goAssetCreation}
        />
      </ListActions>
      <FancyList
        title="Kulturgüter"
        data={result?.data?.content || []}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
