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
    nameSorting,
    setNameSorting,
    distanceSorting,
    setDistanceSorting,
    prioritySorting,
    setPrioritySorting,
    endangeredFiltering,
    setEndangeredFiltering,
    distanceFiltering,
    setDistanceFiltering,
    priorityFiltering,
    setPriorityFiltering,
    setSearchTerm,
  } = useAllAssets();

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  return (
    <Scaffold>
      <SearchBar setSearchTerm={setSearchTerm}>
        <FilteringButton>
          <RadioFilteringOption
            label="In Gefahr"
            options={[
              {name: 'Egal', value: null},
              {name: 'Ja', value: true},
              {name: 'Nein', value: false},
            ]}
            value={endangeredFiltering}
            setValue={setEndangeredFiltering}
          />
          <SliderFilteringOption
            label="Entfernung"
            min={0}
            max={100}
            step={5}
            unit="km"
            value={distanceFiltering}
            setValue={setDistanceFiltering}
          />
          <ChipFilteringOption
            label="Priorität"
            options={Priorities}
            values={priorityFiltering}
            setValues={setPriorityFiltering}
          />
        </FilteringButton>
        <SortingButton>
          <SortingOption
            label="Name"
            sorting={nameSorting}
            setSorting={setNameSorting}
          />
          <SortingOption
            label="Entfernung"
            sorting={distanceSorting}
            setSorting={setDistanceSorting}
          />
          <SortingOption
            label="Priorität"
            sorting={prioritySorting}
            setSorting={setPrioritySorting}
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
