import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  Text,
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
    if (baseAssetResult) {
      setCulturalAsset(new CulturalAsset(baseAssetResult.data));
      if (baseAssetResult.data.culturalAssetParent) {
        setParentAsset([baseAssetResult.data.culturalAssetParent]);
      }
    }
  }, [baseAssetResult]);

  React.useEffect(() => {
    const routeParentId = route.params?.parentId;
    if (routeParentId != null) {
      onChangeParent(routeParentId);
    }
  }, [route.params, onChangeParent]);

  React.useEffect(() => {
    const location = route.params?.location;
    if (location) {
      onChangeLocation(location);
    }
  }, [route.params, onChangeLocation]);

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
  const onChangeLocation = React.useCallback(
    (location) => {
      const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
      updatedCulturalAsset.data.longitude = location.longitude;
      updatedCulturalAsset.data.latitude = location.latitude;
      setCulturalAsset(updatedCulturalAsset);
    },
    [culturalAsset.data],
  );
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
    updatedCulturalAsset.data.priority = prio;
    setCulturalAsset(updatedCulturalAsset);
  };

  function goLocationSelection() {
    navigation.push('LocationSelectionScreen', {
      parent: 'CulturalAssetCreationScreen',
    });
  }

  const goParentSelection = () => {
    navigation.push('CulturalAssetSelectionListScreen', {
      selectionType: 'parent',
    });
  };

  const finishCreation = () => {
    if (screenType === 'update') {
      putAsset(culturalAsset.data.id, culturalAsset.data);
    } else {
      //if(parentAsset !== [])
      //{
      //  culturalAsset.data.culturalAssetParent = {id: parentAsset[0].id};
      //}
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
      <Button
        icon="map-marker"
        mode="contained"
        onPress={goLocationSelection}
        style={styles.buttonSpacing}>
        Wähle Location
      </Button>
      {culturalAsset.data.latitude || culturalAsset.longitude ? (
        <View>
          <Text>{`Breite: ${culturalAsset.data.latitude}`}</Text>
          <Text>{`Länge: ${culturalAsset.data.longitude}`}</Text>
        </View>
      ) : null}
      <TextInput
        label="Adresse"
        value={culturalAsset.data.address}
        onChangeText={onChangeAddress}
        style={styles.buttonSpacing}
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
              selected={prio.value === culturalAsset.data.priority}
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
  priority: 0,
  address: '',
  longitude: 0.0,
  latitude: 0.0,
  label: '',
  level: 0,
};

const styles = StyleSheet.create({
  inputSpacing: {marginBottom: 24},
  textSpacing: {marginBottom: 16},
  buttonSpacing: {marginTop: 16},
  priorityBox: {marginVertical: 24},
  chipWrapper: {margin: 2, flexWrap: 'wrap'},
});
