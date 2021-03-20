import React from 'react';
import {List, IconButton, useTheme} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import useAssets from '../../handlers/AssetsHook';
import ListActions from '../../components/ListActions';
import {useNavigation} from '@react-navigation/native';
import {
  ErrorIndicator,
  LoadingIndicator,
  FancyList,
  SearchBar,
  SortingButton,
  SortingOption,
  SearchProvider,
} from '@ilt-pse/react-native-kueres';

export default function AssetSelectionScreen({route}) {
  const {result, setQuery, requestAssets} = useAssets();
  const content = result?.data?.content;
  const {colors} = useTheme();

  React.useEffect(() => {
    requestAssets();
  }, [requestAssets]);

  if (!result) {
    return <LoadingIndicator />;
  }

  if (!content) {
    return <ErrorIndicator />;
  }

  return (
    <Scaffold>
      <SearchProvider onQueryUpdate={(query) => setQuery(query)}>
        <SearchBar field="name" operation="~">
          <SortingButton>
            <SortingOption field="name" label="Name" />
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
        title="Wähle ein Kulturgut"
        data={content || []}
        extraData={route.params}
        component={AssetSelectionItem}
      />
    </Scaffold>
  );
}

export function AssetSelectionItem({data, extraData}) {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate(extraData.previousRouteName, {
      selectedAsset: data,
    });
  }

  return (
    <List.Item
      key={data?.id}
      title={data?.name}
      description={data?.description}
      onPress={onPress}
    />
  );
}
