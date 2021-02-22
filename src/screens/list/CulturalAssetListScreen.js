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
  SearchProvider,
} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');
  const {authService} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {result, setQuery, requestAllAssets} = useAllAssets();

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="name" operation="~">
          <FilteringButton>
            <RadioFilteringOption
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
              field="distance"
              operation="<"
              min={0}
              max={100}
              step={5}
              unit="km"
              label="Entfernung"
            />
            <ChipFilteringOption
              field="priority"
              operation="="
              options={Priorities}
              label="Priorität"
            />
          </FilteringButton>
          <SortingButton>
            <SortingOption field="name" label="Name" />
            <SortingOption field="distance" label="Entfernung" />
            <SortingOption field="tags" label="Priorität" />
          </SortingButton>
        </SearchBar>
      </SearchProvider>

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
