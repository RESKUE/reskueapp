import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetUnpressableListItem from '../../components/listItems/CulturalAssetUnpressableListItem';
import ListActions from '../../components/ListActions';
import CulturalAsset, {Priorities} from '../../models/CulturalAsset';
import useAsset from '../../handlers/AssetHook';
import useAssets from '../../handlers/AssetsHook';
import useAssetCreation from '../../handlers/AssetCreationHook';

export default function CulturalAssetCreationScreen({navigation, route}) {
  const {requestAsset, result: baseAssetResult} = useAsset();

  const screenType = route.params?.screenType;

  const [culturalAsset, setCulturalAsset] = React.useState(
    new CulturalAsset(emptyCulturalAsset),
  );
  const [parentAsset, setParentAsset] = React.useState([]);

  const {colors} = useTheme();
  const {requestAssets, result: assetResult} = useAssets();
  const {
    postAsset,
    putAsset,
    putSetParent,
    result: creationResult,
  } = useAssetCreation();

  React.useEffect(() => {
    if (screenType === 'update') {
      console.log('Request asset with id: ' + route.params.id);
      requestAsset(route.params.id);
    }
  }, [requestAsset, screenType, route.params.id]);

  React.useEffect(() => {
    requestAssets();
  }, [requestAssets]);

  React.useEffect(() => {
    console.log(baseAssetResult);
    if (baseAssetResult) {
      setCulturalAsset(new CulturalAsset(baseAssetResult.data));
      if (baseAssetResult.data.culturalAssetParent) {
        setParentAsset([baseAssetResult.data.culturalAssetParent]);
      }
    }
  }, [baseAssetResult]);

  const routeParentId = route.params?.parentId;
  React.useEffect(() => {
    if (routeParentId != null) {
      onChangeParent(routeParentId);
    }
  }, [routeParentId, onChangeParent]);

  React.useEffect(() => {
    if (creationResult?.data != null) {
      parentAsset.forEach((asset) => {
        putSetParent(creationResult.data.id, asset.id);
      });
      navigation.goBack();
    } else {
      console.log('Creation result: ' + creationResult);
    }
  }, [creationResult, parentAsset, navigation, putSetParent]);

  const onChangeName = (name) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.name = name;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeDescription = (description) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.description = description;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeAddress = (newAddress) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.address = newAddress;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeParent = React.useCallback(
    (parentId) => {
      setParentAsset([
        assetResult.data.content.find((asset) => asset.id === parentId),
      ]);
    },
    [assetResult],
  );
  const onChangeLabel = (label) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.label = label;
    updatedCulturalAsset.setSpecial();
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangePriority = (prio) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.setPriority(prio);
    setCulturalAsset(updatedCulturalAsset);
  };

  const goParentSelection = () => {
    navigation.push('CulturalAssetSelectionListScreen', {
      selectionType: 'parent',
    });
  };

  const finishCreation = () => {
    if (screenType === 'update') {
      putAsset(culturalAsset.data.id, culturalAsset.data);
    } else {
      postAsset(culturalAsset.data);
    }
  };

  if (assetResult === null || culturalAsset === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={culturalAsset.data.name}
        onChangeText={onChangeName}
      />
      <TextInput
        label="Beschreibung"
        value={culturalAsset.data.description}
        onChangeText={onChangeDescription}
      />
      <TextInput
        label="Adresse"
        value={culturalAsset.data.address}
        onChangeText={onChangeAddress}
      />
      <TextInput
        label="Besonderheiten"
        value={culturalAsset.data.label}
        onChangeText={onChangeLabel}
        style={styles.inputSpacing}
      />

      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goParentSelection}
        />
      </ListActions>
      <FancyList
        title="Obergruppe"
        data={parentAsset}
        component={CulturalAssetUnpressableListItem}
      />
      <View style={styles.priorityBox}>
        <Text>Wähle Priorität:</Text>
        {Priorities.map((prio, index) => (
          <View key={prio.value} style={styles.chipWrapper}>
            <Chip
              icon="alert-circle"
              mode="flat"
              height={30}
              selected={prio.value === culturalAsset.getPriority()}
              onPress={() => onChangePriority(prio.value)}>
              {prio.name}
            </Chip>
          </View>
        ))}
      </View>
      <Button
        icon="check"
        mode="contained"
        onPress={finishCreation}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );
}

const emptyCulturalAsset = {
  name: '',
  description: '',
  tags: ['p0'],
  comments: [],
  address: '',
  longitude: 0.0,
  latitude: 0.0,
  tasks: [],
  label: '',
  level: 0,
};

const styles = StyleSheet.create({
  inputSpacing: {marginBottom: 24},
  buttonSpacing: {marginTop: 16},
  priorityBox: {marginVertical: 24},
  chipWrapper: {margin: 2, flexWrap: 'wrap'},
});
