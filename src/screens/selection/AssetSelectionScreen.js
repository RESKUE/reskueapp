import React from 'react';
import {List} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import useAssets from '../../handlers/AssetsHook';
import {useNavigation} from '@react-navigation/native';
import {
  ErrorIndicator,
  FancyList,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';

export default function AssetSelectionScreen({route}) {
  const {result, requestAssets} = useAssets();
  const content = result?.data?.content;

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
