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
  AuthContext,
  SearchBar,
  FilteringButton,
  SortingButton,
  SortingOption,
  RadioFilteringOption,
  SliderFilteringOption,
  ChipFilteringOption,
  SearchProvider,
  NotificationService,
} from '@ilt-pse/react-native-kueres';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () =>
    navigation.push('CulturalAssetCreationScreen', {
      screenType: 'creation',
      id: -1,
    });
  const {authService} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {result, setQuery, requestAssets} = useAssets();
  const {isAdmin} = useRoles();

  useFocusEffect(
    React.useCallback(() => {
      requestAssets();
    }, [requestAssets]),
  );

  function onServiceOn() {
    NotificationService.start();
  }

  function onServiceOff() {
    NotificationService.stop();
  }

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
            <ChipFilteringOption
              field="priority"
              operation="="
              options={Priorities}
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
        <IconButton color={colors.primary} icon="bell" onPress={onServiceOn} />
        <IconButton
          color={colors.primary}
          icon="bell-off"
          onPress={onServiceOff}
        />
        <IconButton
          color={colors.primary}
          icon="anchor"
          onPress={async () =>
            console.log(
              'REFRESH TOKEN:',
              await authService.storage.getRefreshToken(),
            )
          }
        />
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
          onPress={() => requestAssets()}
        />
        {isAdmin && (
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={goAssetCreation}
          />
        )}
      </ListActions>
      <FancyList
        title="Kulturgüter"
        data={result?.data?.content || []}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
